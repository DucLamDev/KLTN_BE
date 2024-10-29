import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Kafka from 'kafkajs';

const kafka = new Kafka.Kafka({
  clientId: 'clinic-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const createAppointment = async (req, res) => {
  const { patientId, doctorId, appointmentDate, reason } = req.body;

  // Kiểm tra bệnh nhân
  const patient = await Patient.findById(patientId);
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  // Kiểm tra bác sĩ
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  // Tạo lịch hẹn
  const newAppointment = new Appointment({ patientId, doctorId, appointmentDate, reason });
  await newAppointment.save();

  // Gửi thông điệp đến Kafka
  await producer.send({
    topic: 'department-queue',
    messages: [{ value: JSON.stringify(newAppointment) }],
  });

  res.status(201).json(newAppointment);
};

// Khởi động Kafka Producer
const startKafkaProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer is connected');
};

export { createAppointment, startKafkaProducer };
