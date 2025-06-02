const axios = require('axios');
const {BookingRepository} = require('../repositories');
const db = require('../models');
const {ServerConfig,QueueConfig} = require('../config');
const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {BOOKING_STATUS} = require('../utils/common/enums');
const {CONFIRMED, CANCELLED} = BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const transaction = await db.sequelize.transaction();
   try {    
        const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flight.data.data;
        if(data.noOfSeats > flightData.totalSeats){
            throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data,totalCost:totalBillingAmount};
        const booking = await bookingRepository.createBooking(bookingPayload,transaction); 

        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,{
            seats:data.noOfSeats
        });

        await transaction.commit();
        return booking;      
   } catch (error) {
      await transaction.rollback();
      throw error;
   } 
}

async function makePayment(data) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(data.bookingId,transaction);
        if(bookingDetails.status === CANCELLED){
            throw new AppError("Booking has been cancelled", StatusCodes.BAD_REQUEST);
        }
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();
        if(currentTime - bookingTime > 300000){
            await cancelBooking(data.bookingId);
            throw new AppError("Booking has expired", StatusCodes.BAD_REQUEST);
        }
        if(bookingDetails.totalCost != data.totalCost){
            throw new AppError("Total cost does not match", StatusCodes.BAD_REQUEST);
        } 
        if(bookingDetails.userId != data.userId){
            throw new AppError("User id does not match", StatusCodes.BAD_REQUEST);
        }
        //we assume here payment is successful
        await bookingRepository.update(bookingDetails.id,{status:CONFIRMED},transaction);
        QueueConfig.sendData({
            recepientEmail: 'grantpai1503@gmail.com',
            subject: 'Flight booked',
            text: `Booking successfully done for the booking ${data.bookingId}`
        });
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }    
}

async function cancelBooking(bookingId) {
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepository.get(bookingId,transaction);
        if(bookingDetails.status === CANCELLED){
            await transaction.commit();
            return true;
        }
        await axios.patch(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,{
            seats:bookingDetails.noOfSeats,
            dec:0
        });
        await bookingRepository.update(bookingDetails.id,{status:CANCELLED},transaction);
        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }   
}

async function cancelOldBookings() {
    try {
        const time = new Date(Date.now() - 1000* 300);
        const response = await bookingRepository.cancelOldBookings(time);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBooking,
    makePayment,
    cancelBooking,
    cancelOldBookings
}