export declare class ErrorResponse extends Error {
    statusCode: number;
    key?: string;
    constructor(message: string, statusCode: number, key?: string);
}
export declare const getError: (error: any) => string;
