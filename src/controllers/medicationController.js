import {
  createMedicationService,
  getListMedicationsService,
  getOneMedicationByIdService,
  updateMedicationByIdService,
  deleteMedicationByIdService,
  getMedicationByEmail,
} from "../services/medicationServices.js";

export const createMedicationController = async (req, res) => {
  try {
    const newMedication = await createMedicationService(req.body);
    res.status(201).json({
      success: true,
      message: "Medication created successfully",
      data: newMedication,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListMedicationsController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const medication = await getMedicationByEmail(email);
      res.status(200).json(medication);
    } else {
      const medications = await getListMedicationsService();
      res.status(200).json(medications);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneMedicationByIdController = async (req, res) => {
  try {
    const medication = await getOneMedicationByIdService(req.params.id);
    res.status(200).json(medication);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMedicationByIdController = async (req, res) => {
  try {
    const updatedMedication = await updateMedicationByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Medication updated successfully",
      data: updatedMedication,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMedicationByIdController = async (req, res) => {
  try {
    await deleteMedicationByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Medication deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
