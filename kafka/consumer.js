// kafka/consumer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import Appointment from '../models/Appointment.js';

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.CLIENT_ID || 'clinic-management-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  ssl: false, // Tắt SSL nếu không sử dụng
});

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID || 'appointment-group' });

const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log('Kafka Consumer connected');
    await consumer.subscribe({ topic: 'appointment-requests', fromBeginning: true });
  } catch (err) {
    console.error('Failed to connect Kafka Consumer', err);
    process.exit(1);
  }
};

const disconnectConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log('Kafka Consumer disconnected');
  } catch (err) {
    console.error('Error while disconnecting consumer', err);
  }
};

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Closing Kafka consumer...');
  await disconnectConsumer();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing Kafka consumer...');
  await disconnectConsumer();
  process.exit(0);
});

/**
 * Xử lý từng tin nhắn
 * @param {Object} message - Tin nhắn Kafka
 */
const processMessage = async (message) => {
  const request = JSON.parse(message.value);
  const { patientId, appointmentDate, reason } = request;

  // Chuyển đổi appointmentDate thành đối tượng Date
  const appointmentDateObj = new Date(appointmentDate);
  
  // Kiểm tra tính hợp lệ của ngày hẹn
  if (isNaN(appointmentDateObj)) {
    console.error(`Invalid appointmentDate: ${appointmentDate}`);
    return;
  }

  const appointmentDayOfWeek = appointmentDateObj.toLocaleString('en-US', { weekday: 'long' });
  console.log(`Processing appointment for patient ${patientId} on ${appointmentDayOfWeek}`);

  try {
    // Tìm bác sĩ có lịch làm việc trong ngày đó
    const doctors = await Doctor.find({ 'schedule.dayOfWeek': appointmentDayOfWeek });
    console.log(`Found ${doctors.length} doctors available on ${appointmentDayOfWeek}`);

    if (doctors.length === 0) {
      console.log('No doctors available on this day');
      return;
    }

    // Xác định khoảng thời gian bắt đầu và kết thúc của ngày hẹn
    const startOfDay = new Date(appointmentDateObj);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDateObj);
    endOfDay.setHours(23, 59, 59, 999);

    // Sử dụng aggregation để đếm số lượng cuộc hẹn của từng bác sĩ trong ngày đó
    const appointmentCounts = await Appointment.aggregate([
      {
        $match: {
          appointmentDate: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
          status: 'Scheduled',
        },
      },
      {
        $group: {
          _id: '$doctorId',
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(`Appointment counts: ${JSON.stringify(appointmentCounts)}`);

    // Tạo map để tra cứu số lượng cuộc hẹn theo doctorId
    const appointmentCountMap = {};
    appointmentCounts.forEach((doc) => {
      appointmentCountMap[doc._id.toString()] = doc.count;
    });

    console.log(`Appointment count map: ${JSON.stringify(appointmentCountMap)}`);

    // Sắp xếp các bác sĩ dựa trên số lượng cuộc hẹn (từ ít đến nhiều)
    doctors.sort((a, b) => {
      const countA = appointmentCountMap[a._id.toString()] || 0;
      const countB = appointmentCountMap[b._id.toString()] || 0;
      return countA - countB;
    });

    // Chọn bác sĩ đầu tiên trong danh sách đã sắp xếp
    const selectedDoctor = doctors[0];
    const minAppointments = appointmentCountMap[selectedDoctor._id.toString()] || 0;

    console.log(`Selected Doctor: ${selectedDoctor.fullName} with ${minAppointments} appointments`);

    // Kiểm tra xem bệnh nhân có tồn tại không
    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.error(`Patient with ID ${patientId} not found`);
      return;
    }

    // Tạo cuộc hẹn mới
    const appointment = new Appointment({
      patientId,
      doctorId: selectedDoctor._id,
      appointmentDate: appointmentDateObj, // Sử dụng đối tượng Date đã chuyển đổi
      reason,
    });

    await appointment.save();

    console.log(
      `Appointment assigned to Doctor ID: ${selectedDoctor._id}, Total Appointments: ${minAppointments + 1}`
    );
  } catch (err) {
    console.error('Error processing appointment request', err);
    // Bạn có thể thêm cơ chế retry hoặc đẩy message vào dead-letter queue tại đây
  }
};

/**
 * Chạy consumer
 */
const runConsumer = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processMessage(message);
    },
  });
};

export { runConsumer };
