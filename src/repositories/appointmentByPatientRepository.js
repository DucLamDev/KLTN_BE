import AppointmentByPatient from '../models/AppointmentByPatient.js';

export const createAppointmentByPatient = async (appointmentData) => {
  const appointment = new AppointmentByPatient(appointmentData);
  return await appointment.save();
};

export const getListAppointments = async () => {
  return await AppointmentByPatient.find()
  .populate("patientId")
  .populate("doctorId");
};

export const getOneAppointmentById = async (id) => {
  return await AppointmentByPatient.findById(id)    
  .populate("patientId")
  .populate("doctorId");
};

export const updateAppointmentById = async (id, updateData) => {
  return await AppointmentByPatient.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteAppointmentById = async (id) => {
  return await AppointmentByPatient.findByIdAndDelete(id);
};
