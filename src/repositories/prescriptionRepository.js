import Prescription from '../models/Prescription.js';

export const createPrescriptionRepo = async (prescriptionData) => {
  const prescription = new Prescription(prescriptionData);
  return await prescription.save();
};

export const getListPrescriptionsRepo = async () => {
  return await Prescription.find()
};

export const getOnePrescriptionByIdRepo = async (id) => {
  return await Prescription.findById(id)    
};

export const updatePrescriptionByIdRepo = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deletePrescriptionByIdRepo = async (id) => {
  return await Prescription.findByIdAndDelete(id);
};
