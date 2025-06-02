const {FlightRepository} = require("../repositories"); 
const {StatusCodes} = require("http-status-codes");
const {AppError} = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create flight",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlights(){
    try {
        const flights = await flightRepository.getAll();
        return flights;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND){
            throw new AppError("Flight not found", error.StatusCodes);    
        }
        throw new AppError("Cannot fetch data of the flight",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id) {
    try {
        const response = await flightRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND){
            throw new AppError("Flight not found", error.StatusCodes);    
        }
        throw new AppError("Cannot delete the flight",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

async function getAllFlights(query) {
    let sortFilter = {};
    let customFilter = {};
    const endingTriptime = "23:59:00";
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: add a check that they are not same
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice,(maxPrice === undefined ? 20000:maxPrice)]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }   
    }
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.between]: [query.tripDate,query.tripDate + endingTriptime]
        }
    }
    if(query.sortFilter){
        const params = query.sort.split(",");
        const sortFilters = params.map((params)=> param.split("_"));
        sortFilter = [sortFilters]; 
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the flights",StatusCodes.INTERNAL_SERVER_ERROR);
    }   
}

async function getFlight(id){
    try {
            const flight = await flightRepository.get(id);
            return flight;
        } catch (error) {
            if(error.StatusCodes === StatusCodes.NOT_FOUND){
                throw new AppError("Flight not found", error.StatusCodes);    
            }
            throw new AppError("Cannot fetch data of the flight",StatusCodes.INTERNAL_SERVER_ERROR);
        }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        throw new AppError("Cannot update seats",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

module.exports = {
    createFlight,
    getFlights, 
    getFlight,
    destroyFlight,
    getAllFlights,
    updateSeats
}
