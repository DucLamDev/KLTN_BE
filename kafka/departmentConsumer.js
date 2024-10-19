  // kafka/departmentConsumer.js
  import { Kafka } from 'kafkajs';
  import dotenv from 'dotenv';
  import Doctor from '../models/Doctor.js';
  import Appointment from "../models/Appointment.js";

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
    const { patientId, specialization, priority } = patientData;
  
    try {
      // Lấy danh sách bác sĩ và phân công bác sĩ
      const doctors = await Doctor.find({ specialization, isOnline: true });
  
      if (doctors.length === 0) {
        console.log(`Không có bác sĩ nào trong chuyên khoa ${specialization}`);
        return;
      }
  
      // Sử dụng round robin để chọn bác sĩ
      const selectedIndex = roundRobinCounters[specialization] || 0;
      const selectedDoctor = doctors[selectedIndex];
      const selectedRoom = selectedDoctor.roomNumber;
  
      // Cập nhật bộ đếm round robin
      roundRobinCounters[specialization] = (selectedIndex + 1) % doctors.length;
  
      // Gọi hàm thêm vào hàng đợi, ưu tiên bệnh nhân nếu cần
      await addAppointmentToQueue(selectedRoom, patientData);
      console.log(`Bệnh nhân ${patientId} đã được phân công cho bác sĩ ${selectedDoctor._id}`);
  
      // Cập nhật thông tin cuộc hẹn với bác sĩ
      const appointment = await Appointment.findOne({ patientId });
      if (appointment) {
        await appointment.updateOne({ doctorId: selectedDoctor._id });
      }
  
      console.log(`Bệnh nhân ${patientId} đã được thêm vào hàng đợi phòng khám ${selectedRoom}`);
    } catch (err) {
      console.error('Lỗi khi xử lý tin nhắn từ hàng đợi:', err);
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
