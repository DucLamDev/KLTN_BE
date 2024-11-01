import {
    createLaboratoryTechnician,
    getListLaboratoryTechnicians,
    getOneLaboratoryTechnicianById,
    updateLaboratoryTechnicianById,
    deleteLaboratoryTechnicianById
} from '../repositories/laboratoryTechnicianRepository.js';

export const createLaboratoryTechnicians = async (technicianData) => {
    return await createLaboratoryTechnician(technicianData);
};

export const listLaboratoryTechnicians = async () => {
    return await getListLaboratoryTechnicians();
};

export const getLaboratoryTechnicianById = async (id) => {
    const technician = await getOneLaboratoryTechnicianById(id);
    if (!technician) throw new Error("Laboratory Technician not found");
    return technician;
};

export const updateLaboratoryTechnician = async (id, updateData) => {
    const technician = await updateLaboratoryTechnicianById(id, updateData);
    if (!technician) throw new Error("Laboratory Technician not found");
    return technician;
};

export const deleteLaboratoryTechnician = async (id) => {
    const technician = await deleteLaboratoryTechnicianById(id);
    if (!technician) throw new Error("Laboratory Technician not found");
    return technician;
};
