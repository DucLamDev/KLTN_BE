// kafka/consumer.js
import fs from "fs";
import path from "path";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import { addAppointmentToQueue } from "../redis/queueManager.js";

dotenv.config();

const kafka = new Kafka({
  clientId: "clinic-management",
  brokers: ["kafka-1462fd69-hoduclam2408-4b56.c.aivencloud.com:10842"],
  ssl: {
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

const consumer = kafka.consumer({
  groupId: process.env.GROUP_ID || "appointment-group",
  sessionTimeout: 30000, // Thời gian session timeout
  maxPollInterval: 300000, // Thời gian tối đa để poll
});

// Sử dụng Round Robin để chia bệnh nhân cho các bác sĩ
const roundRobinCounters = {};

const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka Consumer connected");
    await consumer.subscribe({
      topic: /department-.*-queue/,
      fromBeginning: true,
    });
  } catch (err) {
    console.error("Failed to connect Kafka Consumer", err);
    process.exit(1);
  }
};

consumer.on(consumer.events.REBALANCING, async (event) => {
  console.log(`Consumer is rebalancing: ${JSON.stringify(event)}`);
});

// Xử lý sự kiện GROUP_JOIN khi consumer gia nhập lại nhóm sau rebalancing
consumer.on(consumer.events.GROUP_JOIN, async (event) => {
  console.log(`Consumer joined group: ${JSON.stringify(event)}`);
});

const disconnectConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log("Kafka Consumer disconnected");
  } catch (err) {
    console.error("Error while disconnecting consumer", err);
  }
};

const processDepartmentQueueMessage = async (message) => {
  console.log(`Received message: ${message.value}`);
  const patientData = JSON.parse(message.value);
  const { patientId, specialization, priority } = patientData;

  try {
    const doctors = await Doctor.find({ specialization, isOnline: true });

    if (doctors.length === 0) {
      console.log(`Không có bác sĩ nào trong chuyên khoa ${specialization}`);
      return;
    }

    const selectedIndex = roundRobinCounters[specialization] || 0;
    const selectedDoctor = doctors[selectedIndex];
    const selectedRoom = selectedDoctor.roomNumber;

    roundRobinCounters[specialization] = (selectedIndex + 1) % doctors.length;

    await addAppointmentToQueue(selectedRoom, patientData);
    console.log(
      `Bệnh nhân ${patientId} đã được phân công cho bác sĩ ${selectedDoctor._id}`
    );

    const appointment = await Appointment.findOne({ patientId });
    if (appointment) {
      await appointment.updateOne({ doctorId: selectedDoctor._id });
    }

    console.log(
      `Bệnh nhân ${patientId} đã được thêm vào hàng đợi phòng khám ${selectedRoom}`
    );
  } catch (err) {
    console.error("Lỗi khi xử lý tin nhắn từ hàng đợi:", err);
  }
};

// Chạy consumer
const runConsumerDepartment = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processDepartmentQueueMessage(message);
    },
  });
};

export { runConsumerDepartment }; // Xuất hàm để xử lý khi bệnh nhân khám xong
