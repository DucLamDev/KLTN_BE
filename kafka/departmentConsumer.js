// kafka/departmentConsumer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import { sendToExamRoomQueue } from './examRoomProducer.js'; // Producer để gửi tới buồng khám

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || 'clinic-management',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ssl: false,
});

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID || 'appointment-group' });

const roomPatientCounts = {}; // { roomNumber: patientCount }

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
    const doctors = await Doctor.find({ specialization, isOnline: true });

    if (doctors.length === 0) {
      console.log(`No doctors available in department ${specialization}`);
      return;
    }

    let selectedRoom = null;
    let minPatients = Infinity;

    for (const doctor of doctors) {
      const roomNumber = doctor.roomNumber;
      const count = roomPatientCounts[roomNumber] || 0;

      if (count < minPatients) {
        minPatients = count;
        selectedRoom = roomNumber;
      }
    }

    if (selectedRoom === null) {
      console.log(`No suitable exam room found for department ${specialization}`);
      return;
    }

    // Tăng số lượng bệnh nhân cho buồng đã chọn
    roomPatientCounts[selectedRoom] = (roomPatientCounts[selectedRoom] || 0) + 1;

    // Phân bệnh nhân vào buồng khám tương ứng
    await sendToExamRoomQueue(selectedRoom, patientData);

    console.log(`Patient ${patientId} assigned to exam room ${selectedRoom} in department ${specialization}`);
  } catch (err) {
    console.error('Error processing department queue message', err);
  }
};

// Xử lý khi bệnh nhân đã khám xong
const processPatientFinished = async (roomNumber) => {
  if (roomPatientCounts[roomNumber]) {
    roomPatientCounts[roomNumber] -= 1; // Giảm số lượng bệnh nhân
    if (roomPatientCounts[roomNumber] < 0) {
      roomPatientCounts[roomNumber] = 0; // Đảm bảo không âm
    }
    console.log(`Patient finished in exam room ${roomNumber}. Current count: ${roomPatientCounts[roomNumber]}`);
  }
};

// Chạy consumer
const runConsumer = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processDepartmentQueueMessage(message);
    },
  });
};

export { runConsumer, processPatientFinished }; // Xuất hàm để xử lý khi bệnh nhân khám xong
