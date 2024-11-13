import {
  createDiagnosis,
  getListDiagnoses,
  getOneDiagnosisById,
  updateDiagnosisById,
  deleteDiagnosisById,
} from "../repositories/diagnosisRepository.js";

export const createDiagnosisService = async (diagnosisData) => {
  try {
    return await createDiagnosis(diagnosisData);
  } catch (error) {
    throw new Error("Error creating diagnosis: " + error.message);
  }
};

export const getListDiagnosesService = async () => {
  try {
    return await getListDiagnoses();
  } catch (error) {
    throw new Error("Error fetching diagnosis list: " + error.message);
  }
};

export const getOneDiagnosisByIdService = async (id) => {
  try {
    const diagnosis = await getOneDiagnosisById(id);
    if (!diagnosis) {
      throw new Error("Diagnosis not found");
    }
    return diagnosis;
  } catch (error) {
    throw new Error("Error fetching diagnosis: " + error.message);
  }
};

export const updateDiagnosisByIdService = async (id, updateData) => {
  try {
    const updatedDiagnosis = await updateDiagnosisById(id, updateData);
    if (!updatedDiagnosis) {
      throw new Error("Diagnosis not found");
    }
    return updatedDiagnosis;
  } catch (error) {
    throw new Error("Error updating diagnosis: " + error.message);
  }
};

export const deleteDiagnosisByIdService = async (id) => {
  try {
    const deletedDiagnosis = await deleteDiagnosisById(id);
    if (!deletedDiagnosis) {
      throw new Error("Diagnosis not found");
    }
    return deletedDiagnosis;
  } catch (error) {
    throw new Error("Error deleting diagnosis: " + error.message);
  }
};
