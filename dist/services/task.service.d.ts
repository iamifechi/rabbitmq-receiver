interface Message {
    [key: string]: any;
}
declare class TaskService {
    private connection;
    private channel;
    private rabbitMqURL;
    constructor(rabbitMqURL: string);
    connect(): Promise<void>;
    close(): Promise<void>;
    sendMessageToQueue(queue: string, message: Message): Promise<void>;
    consumeFromQueue(queue: string, callback: (message: Message) => void): Promise<void>;
}
export declare const taskService: TaskService;
export {};
