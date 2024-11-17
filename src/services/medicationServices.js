import {
  createMedication,
  getListMedications,
  getOneMedicationById,
  updateMedicationById,
  deleteMedicationById,
  findMedication,
} from "../repositories/medicationRepository.js";

export const createMedicationService = async (medicationData) => {
  try {
    return await createMedication(medicationData);
  } catch (error) {
    throw new Error("Error creating medication: " + error.message);
  }
};

export const getMedicationByName = async (medicationName) => {
  let query = {};
  if (medicationName) {
    query.medicationName = medicationName;
  }
  return await findMedication(query);
};

export const getListMedicationsService = async () => {
  try {
    return await getListMedications();
  } catch (error) {
    throw new Error("Error fetching Medication list: " + error.message);
  }
};

export const getOneMedicationByIdService = async (id) => {
  try {
    const medication = await getOneMedicationById(id);
    if (!medication) {
      throw new Error("Medication not found");
    }
    return medication;
  } catch (error) {
    throw new Error("Error fetching Medication: " + error.message);
  }
};

export const updateMedicationByIdService = async (id, updateData) => {
  try {
    const updatedMedication = await updateMedicationById(id, updateData);
    if (!updatedMedication) {
      throw new Error("Medication not found");
    }
    return updatedMedication;
  } catch (error) {
    throw new Error("Error updating Medication: " + error.message);
  }
};

export const deleteMedicationByIdService = async (id) => {
  try {
    const deletedMedication = await deleteMedicationById(id);
    if (!deletedMedication) {
      throw new Error("Medication not found");
    }
    return deletedMedication;
  } catch (error) {
    throw new Error("Error deleting Medication: " + error.message);
  }
};
