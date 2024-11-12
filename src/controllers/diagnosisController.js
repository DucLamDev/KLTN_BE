import {
  createDiagnosisService,
  getListDiagnosesService,
  getOneDiagnosisByIdService,
  updateDiagnosisByIdService,
  deleteDiagnosisByIdService,
} from "../services/diagnosisServices.js";

export const createDiagnosisController = async (req, res) => {
  try {
    const newDiagnosis = await createDiagnosisService(req.body);
    res.status(201).json({
      success: true,
      message: "Diagnosis created successfully",
      data: newDiagnosis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListDiagnosesController = async (req, res) => {
  try {
    const diagnoses = await getListDiagnosesService();
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneDiagnosisByIdController = async (req, res) => {
  try {
    const diagnosis = await getOneDiagnosisByIdService(req.params.id);
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDiagnosisByIdController = async (req, res) => {
  try {
    const updatedDiagnosis = await updateDiagnosisByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Diagnosis updated successfully",
      data: updatedDiagnosis,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDiagnosisByIdController = async (req, res) => {
  try {
    await deleteDiagnosisByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Diagnosis deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
