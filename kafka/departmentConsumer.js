// kafka/departmentConsumer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
// import Appointment from '../models/Appointment.js';
// import { sendToExamRoomQueue } from './roomProducer.js'; // Producer để gửi tới buồng khám
// import { createClient } from 'redis';
import {addAppointmentToQueue} from "../redis/queueManager.js"

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || 'clinic-management',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ssl: false,
});

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID || 'appointment-group' });
// const redisClient = createClient();
// Khởi tạo bộ đếm để theo dõi lần lượt việc phân bệnh nhân cho các bác sĩ trong mỗi chuyên khoa
const roundRobinCounters = {}; // { specialization: currentIndex }

// Kết nối với Kafka
const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka Consumer connected');
    await consumer.subscribe({ topic: /department-.*-queue/, fromBeginning: true });
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
const processDepartmentQueueMessage = async (message) => {
  const patientData = JSON.parse(message.value);
  const { patientId, specialization } = patientData;

  try {
    // Lấy danh sách các bác sĩ theo chuyên khoa và đang online
    const doctors = await Doctor.find({ specialization, isOnline: true });

    if (doctors.length === 0) {
      console.log(`No doctors available in department ${specialization}`);
      return;
    }

    // Khởi tạo bộ đếm cho chuyên khoa nếu chưa có
    if (!roundRobinCounters[specialization]) {
      roundRobinCounters[specialization] = 0;
    }

    // Sử dụng chỉ số round robin để phân bệnh nhân cho bác sĩ tiếp theo
    const selectedIndex = roundRobinCounters[specialization];
    const selectedDoctor = doctors[selectedIndex];

    if (!selectedDoctor) {
      console.log(`No suitable doctor found in department ${specialization}`);
      return;
    }

    const selectedRoom = selectedDoctor.roomNumber;

    // Tăng bộ đếm, quay về 0 nếu đã phân hết tất cả các bác sĩ
    roundRobinCounters[specialization] = (selectedIndex + 1) % doctors.length;

    // Gửi bệnh nhân đến buồng khám tương ứng
    // await sendToExamRoomQueue(selectedRoom, patientData);

    // const queueKey = `queue:${selectedRoom}`;
    await addAppointmentToQueue(selectedRoom, patientData);
  console.log(`Patient ${patientId} added to queue of doctor ${selectedDoctor._id}`);

    console.log(`Patient ${patientId} assigned to exam room ${selectedRoom} in department ${specialization}`);
  } catch (err) {
    console.error('Error processing department queue message', err);
  }
};

// Xử lý khi bệnh nhân đã khám xong
const processPatientFinished = async (roomNumber) => {
  console.log(`Patient finished in exam room ${roomNumber}`);
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

export { runConsumerDepartment, processPatientFinished }; // Xuất hàm để xử lý khi bệnh nhân khám xong
