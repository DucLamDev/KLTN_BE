// kafka/producer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'clinic-management',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

const sendMessage = async (topic, message) => {
  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message) },
    ],
  });
};

export { connectProducer, sendMessage };
