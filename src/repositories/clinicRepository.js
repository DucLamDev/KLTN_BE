import Clinic from '../models/Clinic.js';

export const createClinic = async (clinicData) => {
    const clinic = new Clinic(clinicData);
    return await clinic.save();
};

export const getListClinics = async () => {
    return await Clinic.find()
        .populate('departments')
        .populate('doctors')
        .populate('pharmacists')
        .populate('laboratoryTechnicians')
        .populate('receptionists');
};

export const getOneClinicById = async (id) => {
    return await Clinic.findById(id)
        .populate('departments')
        .populate('doctors')
        .populate('pharmacists')
        .populate('laboratoryTechnicians')
        .populate('receptionists');
};

export const updateClinicById = async (id, updateData) => {
    return await Clinic.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteClinicById = async (id) => {
    return await Clinic.findByIdAndDelete(id);
};
