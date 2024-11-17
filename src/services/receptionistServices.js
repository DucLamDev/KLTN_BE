import { getMedicationFluctuationsRepo } from "../repositories/prescriptionRepository.js";
import {
  createReceptionist,
  getListReceptionists,
  getOneReceptionistById,
  updateReceptionistById,
  deleteReceptionistById,
  findReceptionist,
} from "../repositories/receptionistRepository.js";
// Receptionist, receptionist
export const createReceptionistService = async (receptionistData) => {
  try {
    return await createReceptionist(receptionistData);
  } catch (error) {
    throw new Error("Error creating: " + error.message);
  }
};

export const getReceptionistByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await findReceptionist(query);
};
export const getListReceptionistsService = async () => {
  try {
    return await getListReceptionists();
  } catch (error) {
    throw new Error("Error fetching list: " + error.message);
  }
};

export const getOneReceptionistByIdService = async (id) => {
  try {
    const receptionist = await getOneReceptionistById(id);
    if (!receptionist) {
      throw new Error("Not found");
    }
    return receptionist;
  } catch (error) {
    throw new Error("Error fetching: " + error.message);
  }
};

export const updateReceptionistByIdService = async (id, updateData) => {
  try {
    const updatedReceptionist = await updateReceptionistById(id, updateData);
    if (!updatedReceptionist) {
      throw new Error("Receptionist not found");
    }
    return updatedReceptionist;
  } catch (error) {
    throw new Error("Error updating: " + error.message);
  }
};

export const deleteReceptionistByIdService = async (id) => {
  try {
    const deletedReceptionist = await deleteReceptionistById(id);
    if (!deletedReceptionist) {
      throw new Error("Not found");
    }
    return deletedReceptionist;
  } catch (error) {
    throw new Error("Error deleting: " + error.message);
  }
};

export const getMedicationFluctuationsService = async () => {
  try {
    return await getMedicationFluctuationsRepo();
  } catch (error) {
    throw new Error("Error fetching medication fluctuations: " + error.message);
  }
};
