const {constants} = require('../constants.js');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed", message: err.message, stackTrace: err.stack, statusCode: statusCode});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Un authorized", message: err.message, stackTrace: err.stack, statusCode: statusCode});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden", message: err.message, stackTrace: err.stack
                , statusCode: statusCode});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found", message: err.message, stackTrace: err.stack
                , statusCode: statusCode});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Server Error", message: err.message, stackTrace: err.stack
                , statusCode: statusCode});
            break;
        default:
            console.log("no error, all good");
            break;
    }
};

module.exports = errorHandler;