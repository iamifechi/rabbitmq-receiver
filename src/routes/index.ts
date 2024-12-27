import { Router } from "express";
import { taskRouter } from "./task.routes";

export const baseRouter = Router();
baseRouter.get("/send-msg", (req, res) => {
    res.send("Hello world")
});

const baseRoute = '/api/v1'

export default (app: { use: (arg0: string, arg1: any) => void }) => {
  app.use(`${baseRoute}/`, baseRouter);
  app.use(`${baseRoute}/task`, taskRouter);
};
