
export const rabbit_mq_url = process.env.RABBITMQ_URL || 'amqp://localhost';
export const rabbit_queue = process.env.RABBITMQ_QUEUE as string;
export const port = process.env.PORT;