// kafka/producer.js
// import path from "path";
import { Kafka, Partitioners } from "kafkajs";
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
// Xác định __dirname trong môi trường ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tạo đường dẫn động đến thư mục 'cert'
const certPath = path.join(__dirname, '../../cert');
const kafka = new Kafka({
  clientId: "clinic-management",
  brokers: [process.env.KAFKA_BROKERS],
  connectionTimeout: 10000, 
  ssl: {
    ca: [
      fs.readFileSync(path.join(certPath, 'ca.pem'), 'utf-8'),
    ], // Đường dẫn đến chứng chỉ CA
    cert: fs.readFileSync(path.join(certPath, 'service.cert'), 'utf-8'), // Đường dẫn đến chứng chỉ client
    key: fs.readFileSync(path.join(certPath, 'service.key'), 'utf-8'), // Đường dẫn đến khóa client // Đường dẫn đến khóa client (nếu có)
  },
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner, // Sử dụng LegacyPartitioner để duy trì hành vi cũ
});

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected");
  } catch (err) {
    console.error("Failed to connect Kafka Producer", err);
    process.exit(1);
  }
};

const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Message sent to topic ${topic}`);
  } catch (err) {
    console.error(`Failed to send message to topic ${topic}`, err);
  }
};

const disconnectProducer = async () => {
  try {
    await producer.disconnect();
    console.log("Kafka Producer disconnected");
  } catch (err) {
    console.error("Error while disconnecting producer", err);
  }
};

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Closing Kafka producer...");
  await disconnectProducer();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Closing Kafka producer...");
  await disconnectProducer();
  process.exit(0);
});

export { connectProducer, sendMessage }; // Xuất sendMessage
