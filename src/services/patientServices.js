import { deletePatientById, getListPatients, getOnePatientById, updatePatientById } from "../repositories/patientRepository";

// List all Patients
export const listPatients = async () => {
    return await getListPatients();
  };
  
  // Get details of a specific appointment
  export const getPatientById = async (id) => {
  const patient = await getOnePatientById(id);
  if (!patient) throw new Error("Không có bệnh nhân này tồn tại");
    return patient;
  };
  
  // Update an appointment
  export const updatePatient = async (id, updateData) => {
    const patient = await updatePatientById(id, updateData);
    if (!patient) throw new Error("Bệnh nhân không tồn tại");
    return patient;
  };
  
  // Delete an appointment
  export const deletePatient = async (id) => {
    const patient = await deletePatientById(id);
    if (!patient) throw new Error("Bệnh nhân không tồn tại");
    return patient;
  };
  