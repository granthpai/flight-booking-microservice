const amqplib = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

let channel, connection;
const MAX_RETRIES = 5;
let retryCount = 0;

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost:5672";

async function connectQueue() {
    try {
        console.log('Connecting to RabbitMQ at:', RABBITMQ_URL);
        
        connection = await amqplib.connect(RABBITMQ_URL, { 
            heartbeat: 10,
            timeout: 5000
        });
        
        channel = await connection.createChannel();
        await channel.assertQueue("notification_queue");
        
        console.log('Successfully connected to RabbitMQ');
        retryCount = 0; 
        
        connection.on('close', () => {
            console.log('RabbitMQ connection closed. Attempting to reconnect...');
            reconnect();
        });
        
        connection.on('error', (error) => {
            console.error('RabbitMQ connection error:', error);
        });
        
    } catch (error) {
        console.error(`Failed to connect to RabbitMQ (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(reconnect, 5000); 
        } else {
            console.error('Max retries reached. Could not connect to RabbitMQ.');
            throw error;
        }
    }
}

async function reconnect() {
    console.log('Attempting to reconnect to RabbitMQ...');
    await connectQueue();
}

module.exports = {
    connectQueue,
    channel: () => channel,
    connection: () => connection
};

async function sendData(data) {
    try {
        await channel.sendToQueue("notification_queue",Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log("Queue error",error);
    }
}

module.exports = {
    connectQueue,
    sendData
}
