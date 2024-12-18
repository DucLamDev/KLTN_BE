// kafka/departmentConsumer.js
import fs from "fs";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";
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

const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID || "pharmacist-group",
});
// const redisClient = createClient();
// Khởi tạo bộ đếm để theo dõi lần lượt việc phân bệnh nhân cho các bác sĩ trong mỗi chuyên khoa
const roundRobinCounters = {}; // { specialization: currentIndex }

// Kết nối với Kafka
const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka Consumer connected");
    await consumer.subscribe({
      topic: /Pharmacist-Queue/,
      fromBeginning: true,
    });
  } catch (err) {
    console.error("Failed to connect Kafka Consumer", err);
    process.exit(1);
  }
};

// Ngắt kết nối với Kafka
const disconnectConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log("Kafka Consumer disconnected");
  } catch (err) {
    console.error("Error while disconnecting consumer", err);
  }
};

// Xử lý tin nhắn từ hàng đợi chuyên khoa
const processPharmacistQueueMessage = async (message) => {
  const prescriptionData = JSON.parse(message.value);
  try {
    await addPrescriptionToQueue(prescriptionData);
  } catch (err) {
    console.error("Error processing prescription queue message", err);
  }
};

// Xử lý khi bệnh nhân đã khám xong
const processPatientFinished = async (roomNumber) => {
  console.log(`Patient finished in exam room ${roomNumber}`);
};

// Chạy consumer
const runConsumerPharmacist = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processPharmacistQueueMessage(message);
    },
  });
};

export { runConsumerPharmacist, processPatientFinished }; // Xuất hàm để xử lý khi bệnh nhân khám xong
