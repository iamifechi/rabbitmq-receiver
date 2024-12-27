
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/error.utils";

interface CustomError extends Error {
  errno?: number;
  code?: string | number;
  path?: string;
  syscall?: string;
  stack?: string;
  statusCode?: number;
  errors?: string[] | { [key: string]: string }[];
  key?: string;
  keyPattern?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: CustomError = { ...err };

  error.message = err.message;

  // Log the error using a logging library

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse("Resource not found", 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000 || err.errno === 11000) {
    const duplicateKeyError = err.message.match(/index: (.+?) dup key/);
    const duplicateKey = duplicateKeyError
      ? duplicateKeyError[1].replace(/_\d+$/, "")
      : "Unknown";
    const formattedDuplicateKey = duplicateKey.replace(/_/g, " "); // Replace underscores with spaces
    error = new ErrorResponse(
      `${formattedDuplicateKey} is already in use`,
      400
    );
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