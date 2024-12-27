
import { Router } from "express";
import { taskController } from "../controllers/task.controller";

export const taskRouter = Router();

taskRouter.post(
  "/send-task",
   taskController.sendTask
);
