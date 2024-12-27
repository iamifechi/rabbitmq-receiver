"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.rabbit_queue = exports.rabbit_mq_url = void 0;
exports.rabbit_mq_url = process.env.RABBITMQ_URL || 'amqp://localhost';
exports.rabbit_queue = process.env.RABBITMQ_QUEUE;
exports.port = process.env.PORT;
