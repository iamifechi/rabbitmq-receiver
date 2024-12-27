import { Request, Response } from "express";
declare class TaskController {
    private queue;
    startQueue: () => Promise<void>;
    sendTask: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
}
export declare const taskController: TaskController;
export {};
