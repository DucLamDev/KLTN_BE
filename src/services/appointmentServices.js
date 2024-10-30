// appointmentService.js
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import { sendMessage } from "../kafka/producer.js";

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const { patientId, appointmentDate, specialization } = appointmentData;

  if (!patientId || !appointmentDate || !specialization) {
    throw new Error("patientId, appointmentDate và specialization là bắt buộc");
  }

  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }

  const appointment = new Appointment(appointmentData);
  await appointment.save();

  await sendMessage(`department-${specialization}-queue`, appointment);
  return appointment;
};

// List all appointments
export const listAppointments = async () => {
  return await Appointment.find()
    .populate("patientId")
    .populate("doctorId");
};

// Get details of a specific appointment
export const getAppointmentById = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate("patientId")
    .populate("doctorId");
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Update an appointment
export const updateAppointment = async (id, updateData) => {
  const appointment = await Appointment.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};
