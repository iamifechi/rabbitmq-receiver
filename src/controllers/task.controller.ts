import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { taskService } from "../services";
import { rabbit_queue } from "../config";

class TaskController {
  private queue = rabbit_queue;

  startQueue = async () => {
    try {
      await taskService.connect();

      taskService.consumeFromQueue(this.queue, (message) => {
        console.log("Message received from queue:",JSON.stringify(message));
      });

      // Your Express app code here
    } catch (error) {
      console.error("App startup failed:", error);
    }
  };

  sendTask = asyncHandler(async (req: Request, res: Response, next) => {
    // create message
    try {
      const { task } = req.body;
      if (!task) {
        return res.status(400).json({ message: "Task is required" });
      }

      await taskService.sendMessageToQueue(this.queue, task);
      res.status(200).json({ message: "Task queued for processing." });
    } catch (error) {
      console.error("Error sending task:", error);
      res.status(500).json({ message: "Failed to send task" });
    }
  });
}

export const taskController = new TaskController();
