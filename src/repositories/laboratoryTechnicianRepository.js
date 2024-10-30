import LaboratoryTechnician from '../models/LaboratoryTechnician.js';

export const createLaboratoryTechnician = async (laboratoryTechnicianData) => {
  const laboratoryTechnician = new LaboratoryTechnician(laboratoryTechnicianData);
  return await laboratoryTechnician.save();
};

export const getListLaboratoryTechnicians = async () => {
  return await LaboratoryTechnician.find()
};

export const getOneLaboratoryTechnicianById = async (id) => {
  return await LaboratoryTechnician.findById(id)    
};

export const updateLaboratoryTechnicianById = async (id, updateData) => {
  return await LaboratoryTechnician.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteLaboratoryTechnicianById = async (id) => {
  return await LaboratoryTechnician.findByIdAndDelete(id);
};
