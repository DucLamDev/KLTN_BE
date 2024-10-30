// prescriptionService.js
import Prescription from '../models/Prescription.js';
import { deletePrescriptionByIdRepo, getListPrescriptionsRepo, getOnePrescriptionByIdRepo, updatePrescriptionByIdRepo } from '../repositories/prescriptionRepository.js';

// Create a new prescription
export const createPrescription = async (prescriptionData) => {
    const prescription = new Prescription(prescriptionData);
    return await prescription.save();
};

// Get all prescriptions
export const getAllPrescriptions = async () => {
    return await getListPrescriptionsRepo().populate('patientId').populate('doctorId');
};

// Get a specific prescription by ID
export const getPrescriptionById = async (id) => {
    const prescription = await getOnePrescriptionByIdRepo(id).populate('patientId').populate('doctorId');
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};

// Update a prescription by ID
export const updatePrescription = async (id, updateData) => {
    const prescription = await updatePrescriptionByIdRepo(id, updateData, { new: true, runValidators: true });
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};

// Delete a prescription by ID
export const deletePrescription = async (id) => {
    const prescription = await deletePrescriptionByIdRepo(id);
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};
