import Appointment from '../models/Appointment.js';

export const createAppointment = async (appointmentData) => {
  const appointment = new Appointment(appointmentData);
  return await appointment.save();
};

export const getListAppointments = async () => {
  return await Appointment.find()
  .populate("patientId")
  .populate("doctorId");;
};

export const getOneAppointmentById = async (id) => {
  return await Appointment.findById(id)    
  .populate("patientId")
  .populate("doctorId");
};

export const updateAppointmentById = async (id, updateData) => {
  return await Appointment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteAppointmentById = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};
