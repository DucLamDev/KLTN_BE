// appointmentService.js
import { sendMessage } from "../kafka/producer.js";
import { createAppointment, getListAppointments, getOneAppointmentById, updateAppointmentById, deleteAppointmentById } from "../repositories/appointmentRepository.js";
import { getOnePatientById } from "../repositories/patientRepository.js";

// Create a new appointment
export const createAppointments = async (appointmentData) => {
  const { patientId, appointmentDate, specialization, reason } = appointmentData;

  if (!patientId || !appointmentDate || !specialization || !reason) {
    throw new Error("patientId, appointmentDate và specialization, reason là bắt buộc");
  }

  const patient = await getOnePatientById(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }
  const appointment = await createAppointment(appointmentData);

  await sendMessage(`department-${specialization}-queue`, appointment);
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
