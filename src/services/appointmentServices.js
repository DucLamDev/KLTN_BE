// appointmentService.js
import Patient from "../models/Patient.js";
import { sendMessage } from "../kafka/producer.js";
import { createAppointment, getListAppointments, getOneAppointmentById, updateAppointmentById, deleteAppointmentById } from "../repositories/appointmentRepository.js";

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

  await sendMessage(`department-${specialization}-queue`, appointment);
  const appointment = await createAppointment(appointmentData);
  return appointment;
};

// List all appointments
export const listAppointments = async () => {
  return await getListAppointments();
};

// Get details of a specific appointment
export const getAppointmentById = async (id) => {
const appointment = await getOneAppointmentById(id);
if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Update an appointment
export const updateAppointment = async (id, updateData) => {
  const appointment = await updateAppointmentById(id, updateData);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Delete an appointment
export const deleteAppointment = async (id) => {
  const appointment = await deleteAppointmentById(id);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};
