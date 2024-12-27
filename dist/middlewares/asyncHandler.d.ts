import { NextFunction, Request, RequestHandler, Response } from 'express';
export declare const asyncHandler: (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
