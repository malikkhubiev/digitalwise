const ApiError = require("../error/ApiError");

function errorWrap(serviceFunc){
    return function(req, res, next) {
        try {
            if (!id) return next(ApiError.badRequest("No userId"));
            serviceFunc(req, res, next)
        } catch (e) {
            next(ApiError.badRequest(e.message || "Something went wrong"));
        }
    }
}

function transformController(controller){
    const wrappedController = {};
    for (let func_key in controller) {
        wrappedController[func_key] = errorWrap(controller[func_key])
    }
    return wrappedController;
}

module.exports = {
    transformController
}