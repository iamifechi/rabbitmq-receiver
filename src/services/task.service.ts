// rabbitMQ.ts

import amqp, { Channel, Connection } from 'amqplib';
import { rabbit_mq_url, rabbit_queue } from '../config';

interface Message {
  [key: string]: any;
}

class TaskService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private rabbitMqURL: string;

  constructor(rabbitMqURL: string) {
    this.rabbitMqURL = rabbitMqURL;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.rabbitMqURL);

      this.channel = await this.connection.createChannel();

      await this.channel.assertQueue(rabbit_queue)
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
      throw error;
    }
  }


  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      console.log('RabbitMQ connections closed.');
    } catch (error) {
      console.error('Error closing RabbitMQ connections:', error);
    }
  }

  async sendMessageToQueue(queue: string, message: Message): Promise<void> {
    if (!this.channel) {
      console.error('RabbitMQ Channel not ready');
      return;
    }

    try {
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async consumeFromQueue(
    queue: string,
    callback: (message: Message) => void
  ): Promise<void> {
    if (!this.channel) {
      console.error('RabbitMQ Channel not ready');
      return;
    }
    try {
      await this.channel.assertQueue(queue, { durable: true });
      this.channel.consume(queue, (message) => {
        if (message) {
          callback(JSON.parse(message.content.toString()));
          this.channel?.ack(message); // Acknowledge to prevent re-delivery
        }
      });
      console.log('Waiting for messages...');
    } catch (error) {
      console.error('Error consuming message:', error);
    }
  }
}


export const taskService = new TaskService(rabbit_mq_url);