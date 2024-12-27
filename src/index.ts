import * as dotenv from 'dotenv';
dotenv.config({ path: './src/config/config.env' });
import express, { Express } from "express";
import { taskController } from "./controllers/task.controller";
import useMiddlewares from "./middlewares";
import { port } from "./config";

const app: Express = express();
useMiddlewares(app);


taskController.startQueue();

// process.on('SIGINT', async () => {
//   console.log('Closing RabbitMQ Connection...');
//   await taskService.close();
//   process.exit(0);
// });

// app.get("/send-msg", (req, res) => {
//     res.send("Hello world")
// });

app.listen(port, () => console.log("Server running at port::: " + port));