import {
  createPatientService,
  getListPatientsService,
  getOnePatientByIdService,
  updatePatientByIdService,
  deletePatientByIdService,
  getPatientByEmail,
  getPatientByClerkId,
} from "../services/patientServices.js";

export const createPatientController = async (req, res) => {
  try {
    const newPatient = await createPatientService(req.body);
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnePatientByEmailController = async (req, res) => {
  try {
    const { email } = req.query;
    const patient = await getPatientByEmail(email);
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
};

export const getListPatientsController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const patient = await getPatientByEmail(email);
      res.status(200).json(patient);
    } else {
      const patients = await getListPatientsService();
      res.status(200).json(patients);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnePatientByIdController = async (req, res) => {
  try {
    const patient = await getOnePatientByIdService(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnePatientByClerkIdController = async (req, res) => {
  try {
    const patient = await getPatientByClerkId(req.params.clerkId);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePatientByIdController = async (req, res) => {
  try {
    const updatedPatient = await updatePatientByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePatientByIdController = async (req, res) => {
  try {
    await deletePatientByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
