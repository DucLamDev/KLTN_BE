import LaboratoryTechnician from '../models/LaboratoryTechnician.js';

export const createLaboratoryTechnician = async (technicianData) => {
    const technician = new LaboratoryTechnician(technicianData);
    return await technician.save();
};

export const getListLaboratoryTechnicians = async () => {
    return await LaboratoryTechnician.find()
        .populate('labTestList.patientId');
};

export const getOneLaboratoryTechnicianById = async (id) => {
    return await LaboratoryTechnician.findById(id)
        .populate('labTestList.patientId');
};

export const updateLaboratoryTechnicianById = async (id, updateData) => {
    return await LaboratoryTechnician.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteLaboratoryTechnicianById = async (id) => {
    return await LaboratoryTechnician.findByIdAndDelete(id);
};
