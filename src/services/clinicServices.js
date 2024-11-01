import {
    createClinic,
    getListClinics,
    getOneClinicById,
    updateClinicById,
    deleteClinicById
} from '../repositories/clinicRepository.js';

export const createClinics = async (clinicData) => {
    return await createClinic(clinicData);
};

export const listClinics = async () => {
    return await getListClinics();
};

export const getClinicById = async (id) => {
    const clinic = await getOneClinicById(id);
    if (!clinic) throw new Error("Clinic not found");
    return clinic;
};

export const updateClinic = async (id, updateData) => {
    const clinic = await updateClinicById(id, updateData);
    if (!clinic) throw new Error("Clinic not found");
    return clinic;
};

export const deleteClinic = async (id) => {
    const clinic = await deleteClinicById(id);
    if (!clinic) throw new Error("Clinic not found");
    return clinic;
};
