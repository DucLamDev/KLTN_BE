import Medication from "../models/Medication.js";
export const createMedication = async (medicationData) => {
  const medication = new Medication(medicationData);
  return await medication.save();
};

export const getListMedications = async () => {
  return await Medication.find();
};

export const findMedication = async (query) => {
  return await Medication.findOne(query);
};

export const getOneMedicationById = async (id) => {
  return await Medication.findById(id);
};

export const updateMedicationById = async (id, updateData) => {
  return await Medication.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteMedicationById = async (id) => {
  return await Medication.findByIdAndDelete(id);
};
