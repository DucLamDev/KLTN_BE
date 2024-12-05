import {
  createPrescriptionRepo,
  getListPrescriptionsRepo,
  getOnePrescriptionByIdRepo,
  updatePrescriptionByIdRepo,
  deletePrescriptionByIdRepo,
  completePrescriptionRepository,
  findPrescriptionByAppointmentId,
  checkPrescriptionByAppointmentIdRepo,
  getAppointmentIdsByDoctorIdRepo,
} from "../repositories/prescriptionRepository.js";

export const createPrescriptionService = async (prescriptionData) => {
  try {
    return await createPrescriptionRepo(prescriptionData);
  } catch (error) {
    throw new Error("Error creating prescription: " + error.message);
  }
};

export const getListPrescriptionsService = async () => {
  try {
    return await getListPrescriptionsRepo();
  } catch (error) {
    throw new Error("Error fetching prescription list: " + error.message);
  }
};

export const getOnePrescriptionByIdService = async (id) => {
  try {
    const prescription = await getOnePrescriptionByIdRepo(id);
    if (!prescription) {
      throw new Error("Prescription not found");
    }
    return prescription;
  } catch (error) {
    throw new Error("Error fetching prescription: " + error.message);
  }
};

export const getOnePrescriptionByAppointmentIdService = async (
  appointmentId
) => {
  let query = {};
  if (appointmentId) {
    query.appointmentId = appointmentId;
  }
  return await findPrescriptionByAppointmentId(query);
};
export const getListAdminsService = async () => {
  try {
    return await getListAdmins();
  } catch (error) {
    throw new Error("Error fetching admin list: " + error.message);
  }
};

export const updatePrescriptionByIdService = async (id, updateData) => {
  try {
    const updatedPrescription = await updatePrescriptionByIdRepo(
      id,
      updateData
    );
    if (!updatedPrescription) {
      throw new Error("Prescription not found");
    }
    return updatedPrescription;
  } catch (error) {
    throw new Error("Error updating prescription: " + error.message);
  }
};

export const deletePrescriptionByIdService = async (id) => {
  try {
    const deletedPrescription = await deletePrescriptionByIdRepo(id);
    if (!deletedPrescription) {
      throw new Error("Prescription not found");
    }
    return deletedPrescription;
  } catch (error) {
    throw new Error("Error deleting prescription: " + error.message);
  }
};

export const completePrescriptionService = async (
  prescriptionId,
  warehouseId
) => {
  try {
    const completedPrescription = await completePrescriptionRepository(
      prescriptionId,
      warehouseId
    );
    return completedPrescription;
  } catch (error) {
    throw new Error("Error completing prescription: " + error.message);
  }
};

export const checkPrescriptionByAppointmentIdService = async (
  appointmentId
) => {
  const exists = await checkPrescriptionByAppointmentIdRepo(appointmentId);
  return !!exists;
};

export const getAppointmentIdsByDoctorIdService = async (doctorId) => {
  return await getAppointmentIdsByDoctorIdRepo(doctorId);
};
