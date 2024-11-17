import {
  createPrescriptionService,
  getListPrescriptionsService,
  getOnePrescriptionByIdService,
  updatePrescriptionByIdService,
  deletePrescriptionByIdService,
  completePrescriptionService,
} from "../services/prescriptionServices.js";
import { getMedicationFluctuationsService } from "../services/receptionistServices.js";

export const createPrescriptionController = async (req, res) => {
  try {
    const newPrescription = await createPrescriptionService(req.body);
    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: newPrescription,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListPrescriptionsController = async (req, res) => {
  try {
    const prescriptions = await getListPrescriptionsService();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOnePrescriptionByIdController = async (req, res) => {
  try {
    const prescription = await getOnePrescriptionByIdService(req.params.id);
    res.status(200).json(prescription);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePrescriptionByIdController = async (req, res) => {
  try {
    const updatedPrescription = await updatePrescriptionByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: updatedPrescription,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePrescriptionByIdController = async (req, res) => {
  try {
    await deletePrescriptionByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const completePrescriptionController = async (req, res) => {
  try {
    const { prescriptionId, warehouseId } = req.body;
    const completedPrescription = await completePrescriptionService(
      prescriptionId,
      warehouseId
    );
    res.status(200).json({
      success: true,
      message: "Prescription completed successfully",
      data: completedPrescription,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMedicationFluctuationsController = async (req, res) => {
  try {
    const fluctuations = await getMedicationFluctuationsService();
    res.status(200).json(fluctuations);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
