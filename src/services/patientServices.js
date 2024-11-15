import {
  createPatient,
  getListPatients,
  getOnePatientById,
  updatePatientById,
  deletePatientById,
  findPatient,
} from "../repositories/patientRepository.js";

export const createPatientService = async (patientData) => {
  try {
    return await createPatient(patientData);
  } catch (error) {
    throw new Error("Error creating patient: " + error.message);
  }
};

export const getListPatientsService = async () => {
  try {
    return await getListPatients();
  } catch (error) {
    throw new Error("Error fetching patient list: " + error.message);
  }
};

export const getOnePatientByIdService = async (id) => {
  try {
    const patient = await getOnePatientById(id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  } catch (error) {
    throw new Error("Error fetching patient: " + error.message);
  }
};

export const updatePatientByIdService = async (id, updateData) => {
  try {
    const updatedPatient = await updatePatientById(id, updateData);
    if (!updatedPatient) {
      throw new Error("Patient not found");
    }
    return updatedPatient;
  } catch (error) {
    throw new Error("Error updating patient: " + error.message);
  }
};

export const deletePatientByIdService = async (id) => {
  try {
    const deletedPatient = await deletePatientById(id);
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    throw new Error("Error deleting patient: " + error.message);
  }
};

export const getPatientByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await findPatient(query);
};

export const getPatientByClerkId = async (clerkId) => {
  let query = {};
  if (clerkId) {
    query.clerkId = clerkId;
  }
  return await findPatient(query);
};
