import Prescription from '../models/Prescription.js';

export const createPrescriptionRepo = async (prescriptionData) => {
  const prescription = new Prescription(prescriptionData);
  return await prescription.save();
};

export const getListPrescriptions = async () => {
  return await Prescription.find()
};

export const getOnePrescriptionById = async (id) => {
  return await Prescription.findById(id)    
};

export const updatePrescriptionById = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deletePrescriptionById = async (id) => {
  return await Prescription.findByIdAndDelete(id);
};
