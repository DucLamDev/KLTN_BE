// prescriptionService.js
import Prescription from '../models/Prescription.js';

// Create a new prescription
export const createPrescription = async (prescriptionData) => {
    const prescription = new Prescription(prescriptionData);
    return await prescription.save();
};

// Get all prescriptions
export const getAllPrescriptions = async () => {
    return await Prescription.find().populate('patientId').populate('doctorId');
};

// Get a specific prescription by ID
export const getPrescriptionById = async (id) => {
    const prescription = await Prescription.findById(id).populate('patientId').populate('doctorId');
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};

// Update a prescription by ID
export const updatePrescription = async (id, updateData) => {
    const prescription = await Prescription.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};

// Delete a prescription by ID
export const deletePrescription = async (id) => {
    const prescription = await Prescription.findByIdAndDelete(id);
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
};