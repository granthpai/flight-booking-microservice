const {StatusCodes} = require("http-status-codes");
const {AirportServices} = require("../services");
const {SuccessResponse,ErrorResponse} = require("../utils/common");

/**
 * POST: /airports
 * req-body: {name: 'Delhi', code: 'DEL', address: 'Delhi', cityId: 1}
 */
async function createAirport(req, res){
    try {
        const airport = await AirportServices.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        });
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET: /airports
 * req-body: {}
 */
async function getAirports(req, res){
    try {
        const airports = await AirportServices.getAirports();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}   

/**
 * GET: /airports/:id
 * req-body: {}
 */
async function getAirport(req, res){
    try {
        const airport = await AirportServices.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE: /airports/:id
 * req-body: {}
 */
async function destroyAirport(req, res){
    try {
        const airport = await AirportServices.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport 
}