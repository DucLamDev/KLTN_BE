// kafka/consumer.js
import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';

dotenv.config();

const kafka = new Kafka({
  clientId: 'clinic-management-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'appointment-group' });

const connectConsumer = async () => {
  await consumer.connect();
  console.log('Kafka Consumer connected');
  await consumer.subscribe({ topic: 'appointment-requests', fromBeginning: true });
};

const processMessage = async (message) => {
  const request = JSON.parse(message.value);
  
  // Giả sử bạn có thêm trường specialization trong request
  const { patientId, appointmentDate, reason} = request;

 // Lấy ngày trong tuần từ ngày bệnh nhân yêu cầu
  const appointmentDayOfWeek = new Date(appointmentDate).toLocaleString('en-US', { weekday: 'long' });

  // Tìm bác sĩ theo chuyên môn
  const doctors = await Doctor.find();
  // if (doctors.length === 0) {
  //   console.log('No doctors with the specified specialization');
  //   return;
  // }
const patient = await Patient.find({id: patientId})
  let selectedDoctor = null;
  let minAppointments = Infinity;

  for (const doctor of doctors) {

    const doctorSchedule = doctor.schedule.find(
      (schedule) => schedule.dayOfWeek === appointmentDayOfWeek
    );

    if (doctorSchedule) {
      // Kiểm tra số lượng lịch hẹn đã lên cho bác sĩ trong ngày đó
      const appointmentCount = await Appointment.countDocuments({
        doctorId: doctor._id,
        appointmentDate: {
          $gte: new Date(appointmentDate).setHours(0, 0, 0, 0),
          $lt: new Date(appointmentDate).setHours(23, 59, 59, 999),
        },
        status: 'Scheduled',
      });
    if (appointmentCount < minAppointments) {
      minAppointments = appointmentCount;
      selectedDoctor = doctor;
    }
  }
}
  if (selectedDoctor) {
    const appointment = new Appointment({
      patientId,
      doctorId: selectedDoctor._id,
      appointmentDate,
      reason,
      status: 'Scheduled',
    });

    await appointment.save();

    selectedDoctor.appointments.push({
      appointmentId: appointment._id,
      patientId,
      appointmentDate,
      reason,
    });
    await selectedDoctor.save();
    
    console.log(`Appointment assigned to Doctor ID: ${selectedDoctor._id}`);
  } else {
    console.log('No available doctors to assign');
  }
};

const runConsumer = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await processMessage(message);
    },
  });
};

export { runConsumer };
