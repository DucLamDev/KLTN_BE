import Patient from '../models/Patient.js';

export const createPatient = async (patientData) => {
  const patient = new Patient(patientData);
  return await patient.save();
};

export const getListPatients = async () => {
  return await Patient.find()
};

export const getOnePatientById = async (id) => {
  return await Patient.findById(id)    
};

export const updatePatientById = async (id, updateData) => {
  return await Patient.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deletePatientById = async (id) => {
  return await Patient.findByIdAndDelete(id);
};
