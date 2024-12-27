import { Request, Response, NextFunction } from "express";
interface CustomError extends Error {
    errno?: number;
    code?: string | number;
    path?: string;
    syscall?: string;
    stack?: string;
    statusCode?: number;
    errors?: string[] | {
        [key: string]: string;
    }[];
    key?: string;
    keyPattern?: any;
}
export declare const errorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => void;
export {};
