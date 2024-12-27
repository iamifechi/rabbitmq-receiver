"use strict";
// import { AxiosError } from "axios";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getError = exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(message, statusCode, key) {
        super(message);
        this.statusCode = statusCode;
        this.key = key;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ErrorResponse = ErrorResponse;
const getError = (error) => {
    if (typeof error === "string") {
        return error;
    }
    //   if (error?.isAxiosError) {
    //     // const axiosError = error as AxiosError;
    //     // if (axiosError.response === undefined) {
    //     //   return "Network error. Please check your internet connection and try again.";
    //     // }
    //     // const { response } = axiosError;
    //     if (response?.data) {
    //       const { message } = response.data as { message: any };
    //       if (message) {
    //         return message;
    //       }
    //     }
    //     if (response.status === 401) {
    //       return "Authentication failed. Please check your email and password.";
    //     } else if (response.status === 404) {
    //       return "Resource not found. Please try again later.";
    //     } else {
    //       return "An unexpected error occurred. Please try again later.";
    //     }
    //   } else if (error.message) {
    //     return error.message;
    //   } 
    else {
        return "An unexpected error occurred. Please try again later.";
    }
};
exports.getError = getError;
