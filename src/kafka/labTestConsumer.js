  // kafka/departmentConsumer.js
  import { Kafka } from 'kafkajs';
  import dotenv from 'dotenv';
  import {addRequestTestToQueue} from "../redis/queueManager.js"
import LaboratoryTechnician from '../models/LaboratoryTechnician.js';

  dotenv.config();

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID || 'clinic-management',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    ssl: false,
  });

  const consumer = kafka.consumer({ groupId: process.env.GROUP_ID || 'labTest-group' });

  // Kết nối với Kafka
  const connectConsumer = async () => {
    try {
      await consumer.connect();
      console.log('Kafka Consumer connected');
      await consumer.subscribe({ topic: /LabTest-queue/, fromBeginning: true });
    } catch (err) {
      console.error('Failed to connect Kafka Consumer', err);
      process.exit(1);
    }
  };

  // Ngắt kết nối với Kafka
  const disconnectConsumer = async () => {
    
    try {
      await consumer.disconnect();
      console.log('Kafka Consumer disconnected');
    } catch (err) {
      console.error('Error while disconnecting consumer', err);
    }
  };

  // Xử lý tin nhắn từ hàng đợi chuyên khoa
  // const processLabTestQueueMessage = async (message) => {
  //   const requestTestData = JSON.parse(message.value);
  //   try {
  //     await addRequestTestToQueue(requestTestData);
  //   } catch (err) {
  //     console.error('Error processing requestTest queue message', err);
  //   }
  // };


  const processLabTestQueueMessage = async (message) => {
    console.log(`Received message: ${message.value}`);
    const requestData = JSON.parse(message.value);
    const { patientId, testName} = requestData;
  
    try {
      await addRequestTestToQueue(testName, requestData);
      console.log(`Bệnh nhân ${patientId} đã được phân xét nghiệm ${testName}`);
    } catch (err) {
      console.error('Lỗi khi xử lý tin nhắn từ hàng đợi:', err);
    }
  };

  // Chạy consumer
  const runConsumerLabTest = async () => {
    await connectConsumer();
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        await processLabTestQueueMessage(message);
      },
    });
  };

  export {runConsumerLabTest}; // Xuất hàm để xử lý khi bệnh nhân khám xong
