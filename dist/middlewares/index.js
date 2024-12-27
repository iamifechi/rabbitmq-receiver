"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../routes/index"));
const error_middleware_1 = require("./error.middleware");
exports.default = (app) => {
    // Body parser
    app.use(express_1.default.json());
    //   // Enable CORS
    //   app.use(cors());
    // Set static folder for uploads and others
    app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    //Use app routes
    (0, index_1.default)(app);
    //not found
    app.use("**", (req, res) => res.status(404).send({ message: "Route not found" }));
    //error handler
    app.use(error_middleware_1.errorHandler);
};
