  // kafka/departmentConsumer.js
  import { Kafka } from 'kafkajs';
  import dotenv from 'dotenv';
  import {addRequestTestToQueue} from "../redis/queueManager.js"

  dotenv.config();

  const kafka = new Kafka({
    clientId: process.env.CLIENT_ID || 'clinic-management',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    ssl: false,
  });

  const consumer = kafka.consumer({ groupId: process.env.GROUP_ID || 'pharmacist-group' });

  // Kết nối với Kafka
  const connectConsumer = async () => {
    try {
      await consumer.connect();
      console.log('Kafka Consumer connected');
      await consumer.subscribe({ topic: /LabTest-Queue/, fromBeginning: true });
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
  const processLabTestQueueMessage = async (message) => {
    const requestTestData = JSON.parse(message.value);
    try {
      await addRequestTestToQueue(requestTestData);
    } catch (err) {
      console.error('Error processing requestTest queue message', err);
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
  };s

  export { runConsumerLabTest}; // Xuất hàm để xử lý khi bệnh nhân khám xong
