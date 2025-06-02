const {StatusCodes} = require("http-status-codes");
const {FlightServices} = require("../services");
const {SuccessResponse,ErrorResponse} = require("../utils/common");

/**
 * POST: /flights
 * req-body: {flightNumber: 'AI101', departureAirportId: 1, arrivalAirportId: 1, departureTime: '2025-05-17T10:56:57.000Z', arrivalTime: '2025-05-17T10:56:57.000Z', airplaneId: 1, price: 1000, seats: 100}
 */
async function createFlight(req, res){
    try {
        const flight = await FlightServices.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            price:req.body.price,
            totalSeats:req.body.seats,
            boardingGate:req.body.boardingGate
        });
        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}   

async function getAllFlights(req, res){
    try {
        const flights = await FlightServices.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /flights/:id
 * req-body: {}
 */
async function getFlight(req, res){
    try {
        const flight = await FlightServices.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateSeats(req, res){
    try {
        const response = await FlightServices.updateSeats({
            flightId:req.params.flightId,
            seats:req.body.seats,
            dec:req.body.dec
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}