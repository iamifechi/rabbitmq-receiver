"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_utils_1 = require("../utils/error.utils");
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    // Log the error using a logging library
    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        error = new error_utils_1.ErrorResponse("Resource not found", 404);
    }
    // Mongoose duplicate key
    if (err.code === 11000 || err.errno === 11000) {
        const duplicateKeyError = err.message.match(/index: (.+?) dup key/);
        const duplicateKey = duplicateKeyError
            ? duplicateKeyError[1].replace(/_\d+$/, "")
            : "Unknown";
        const formattedDuplicateKey = duplicateKey.replace(/_/g, " "); // Replace underscores with spaces
        error = new error_utils_1.ErrorResponse(`${formattedDuplicateKey} is already in use`, 400);
    }
    // // Mongoose validation error
    // if (err.name === "ValidationError") {
    //   const errors = err.errors;
    //   console.log({errors})
    //   const message = Object.values(errors as Record<string, any>).map(
    //     (val: any) => ({ [val.path || "key"]: val.properties.message })
    //   );
    //   error = { ...err, errors: message, statusCode: 400 };
    // }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error",
        key: error.key,
        errors: error.errors,
    });
};
exports.errorHandler = errorHandler;
