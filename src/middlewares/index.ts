import express, { Application } from "express";
import path from "path";
import useRoutes from "../routes/index";
import { errorHandler } from "./error.middleware";

export default (app: Application) => {
  // Body parser
  app.use(express.json());


//   // Enable CORS
//   app.use(cors());

  // Set static folder for uploads and others
  app.use(express.static(path.join(__dirname, "public")));

  //Use app routes
  useRoutes(app);

  //not found
  app.use("**", (req, res) =>
    res.status(404).send({ message: "Route not found" })
  );

  //error handler
  app.use(errorHandler);
};