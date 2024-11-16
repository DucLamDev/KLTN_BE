import { redisClient } from "../redis/redisClient.js";
import {
  createLaboratoryTechnician,
  getListLaboratoryTechnicians,
  getOneLaboratoryTechnicianById,
  updateLaboratoryTechnicianById,
  deleteLaboratoryTechnicianById,
  findLaboratoryTechnician,
} from "../repositories/laboratoryTechnicianRepository.js";
import { getAppointmentsFromQueue } from "../repositories/queueRepository.js";

export const createLaboratoryTechnicians = async (technicianData) => {
  return await createLaboratoryTechnician(technicianData);
};

export const getLaboratoryTechnicianByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await findLaboratoryTechnician(query);
};

export const getListLaboratoryTechniciansService = async () => {
  return await getListLaboratoryTechnicians();
};

export const getLaboratoryTechnicianById = async (id) => {
  const technician = await getOneLaboratoryTechnicianById(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};

export const updateLaboratoryTechnician = async (id, updateData) => {
  const technician = await updateLaboratoryTechnicianById(id, updateData);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};

export const deleteLaboratoryTechnician = async (id) => {
  const technician = await deleteLaboratoryTechnicianById(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};

export const getRequestTestFromQueue = async (specialization) => {
  const queueKey = `queue:LabTest-${specialization}`;
  const requestTestsData = await getAppointmentsFromQueue(queueKey);

  const parsedData = requestTestsData
    .map((data) => {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(`Invalid JSON data: ${data}`);
        return null;
      }
    })
    .filter((data) => data !== null);

  return parsedData;
};
