"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const asyncHandler_1 = require("../middlewares/asyncHandler");
const services_1 = require("../services");
const config_1 = require("../config");
class TaskController {
    constructor() {
        this.queue = config_1.rabbit_queue;
        this.startQueue = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield services_1.taskService.connect();
                services_1.taskService.consumeFromQueue(this.queue, (message) => {
                    console.log("Message received from queue:", JSON.stringify(message));
                });
                // Your Express app code here
            }
            catch (error) {
                console.error("App startup failed:", error);
            }
        });
        this.sendTask = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // create message
            try {
                const { task } = req.body;
                if (!task) {
                    return res.status(400).json({ message: "Task is required" });
                }
                yield services_1.taskService.sendMessageToQueue(this.queue, task);
                res.status(200).json({ message: "Task queued for processing." });
            }
            catch (error) {
                console.error("Error sending task:", error);
                res.status(500).json({ message: "Failed to send task" });
            }
        }));
    }
}
exports.taskController = new TaskController();
