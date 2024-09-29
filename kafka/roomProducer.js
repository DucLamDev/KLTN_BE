// kafka/examRoomProducer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || 'clinic-management',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ssl: false,
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka Producer connected for rooms');
  } catch (err) {
    console.error('Failed to connect Kafka Producer', err);
    process.exit(1);
  }
};

/**
 * Gửi bệnh nhân vào hàng đợi của buồng khám
 * @param {String} roomNumber - ID của buồng khám
 * @param {Object} patientData - Thông tin bệnh nhân
 */
const sendToExamRoomQueue = async (roomNumber, patientData) => {
  const topic = `room-${roomNumber}-queue`;
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(patientData) }],
  });
  console.log(`Patient sent to exam room queue: ${roomNumber}`);
};

const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log('Kafka Producer disconnected for exam rooms');
  } catch (err) {
    console.error('Error while disconnecting producer for exam rooms', err);
  }
};

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Closing Kafka exam room producer...');
  await disconnectProducer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing Kafka exam room producer...');
  await disconnectProducer();
  process.exit(0);
});

export { connectProducer, sendToExamRoomQueue };
