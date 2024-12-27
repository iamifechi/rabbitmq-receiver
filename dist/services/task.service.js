"use strict";
// rabbitMQ.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const config_1 = require("../config");
class TaskService {
    constructor(rabbitMqURL) {
        this.connection = null;
        this.channel = null;
        this.rabbitMqURL = rabbitMqURL;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect(this.rabbitMqURL);
                this.channel = yield this.connection.createChannel();
                yield this.channel.assertQueue(config_1.rabbit_queue);
                console.log('Connected to RabbitMQ');
            }
            catch (error) {
                console.error('Error connecting to RabbitMQ:', error);
                throw error;
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.channel) {
                    yield this.channel.close();
                }
                if (this.connection) {
                    yield this.connection.close();
                }
                console.log('RabbitMQ connections closed.');
            }
            catch (error) {
                console.error('Error closing RabbitMQ connections:', error);
            }
        });
    }
    sendMessageToQueue(queue, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                console.error('RabbitMQ Channel not ready');
                return;
            }
            try {
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
                console.log('Message sent:', message);
            }
            catch (error) {
                console.error('Error sending message:', error);
            }
        });
    }
    consumeFromQueue(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.channel) {
                console.error('RabbitMQ Channel not ready');
                return;
            }
            try {
                yield this.channel.assertQueue(queue, { durable: true });
                this.channel.consume(queue, (message) => {
                    var _a;
                    if (message) {
                        callback(JSON.parse(message.content.toString()));
                        (_a = this.channel) === null || _a === void 0 ? void 0 : _a.ack(message); // Acknowledge to prevent re-delivery
                    }
                });
                console.log('Waiting for messages...');
            }
            catch (error) {
                console.error('Error consuming message:', error);
            }
        });
    }
}
exports.taskService = new TaskService(config_1.rabbit_mq_url);
