import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || 'clinic-management',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ssl: false,
});

const consumer = kafka.consumer({ groupId: 'my-group' });
const roomData = {};

const connectConsumer = async () => {
  await consumer.connect();
  console.log('Kafka  Room Consumer connected');
  
  await consumer.subscribe({ topic: /room-.*-queue/, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const roomNumber = topic.replace('room-', '').replace('-queue', '');
      const patientData = JSON.parse(message.value.toString());
  
      // Lưu dữ liệu vào roomData
      if (!roomData[roomNumber]) {
        roomData[roomNumber] = [];
      }
      roomData[roomNumber].push(patientData);
  
      console.log(`Data for room ${roomNumber}:`, roomData[roomNumber]);
    },
  });
  
};

export { connectConsumer, roomData };
