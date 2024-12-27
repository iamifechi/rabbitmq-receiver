"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseRouter = void 0;
const express_1 = require("express");
const task_routes_1 = require("./task.routes");
exports.baseRouter = (0, express_1.Router)();
exports.baseRouter.get("/send-msg", (req, res) => {
    res.send("Hello world");
});
const baseRoute = '/api/v1';
exports.default = (app) => {
    app.use(`${baseRoute}/`, exports.baseRouter);
    app.use(`${baseRoute}/task`, task_routes_1.taskRouter);
};
