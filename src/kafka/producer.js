// kafka/producer.js
import fs from "fs";
// import path from "path";
import { Kafka, Partitioners } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: "clinic-management",
  brokers: [process.env.KAFKA_BROKERS],
  ssl: {
    // C:\Users\ADMIN\Videos\KLTN_Code\KLTN_BE
    ca: [
      fs.readFileSync(
        "C:/Users/ADMIN/Videos/KLTN_Code/KLTN_BE/cert/ca.pem",
        "utf-8"
      ),
    ], // Đường dẫn đến chứng chỉ CA
    cert: fs.readFileSync(
      "C:/Users/ADMIN/Videos/KLTN_Code/KLTN_BE/cert/service.cert",
      "utf-8"
    ), // Đường dẫn đến chứng chỉ client (nếu có)
    key: fs.readFileSync(
      "C:/Users/ADMIN/Videos/KLTN_Code/KLTN_BE/cert/service.key",
      "utf-8"
    ), // Đường dẫn đến khóa client (nếu có)
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
