const {AirportRepository} = require("../repositories"); 
const {StatusCodes} = require("http-status-codes");
const {AppError} = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name === "SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airports",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND){
            throw new AppError("Airport not found", error.StatusCodes);    
        }
        throw new AppError("Cannot fetch data of the airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.StatusCodes === StatusCodes.NOT_FOUND){
            throw new AppError("Airport not found", error.StatusCodes);    
        }
        throw new AppError("Cannot delete the airport",StatusCodes.INTERNAL_SERVER_ERROR);
    }
    
}   

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}
