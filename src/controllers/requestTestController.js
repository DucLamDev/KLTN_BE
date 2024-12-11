import { checkRequestTestExistence } from "../services/receptionistServices.js";
import {
  createRequestTestService,
  getListRequestTestsService,
  getOneRequestTestByIdService,
  updateRequestTestByIdService,
  deleteRequestTestByIdService,
  getAppointmentIdsForDoctor,
} from "../services/requestTestServices.js";

export const createRequestTestController = async (req, res) => {
  try {
    const newRequestTest = await createRequestTestService(req.body);
    res.status(201).json({
      success: true,
      message: "Request test created successfully",
      data: newRequestTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListRequestTestsController = async (req, res) => {
  try {
    const requestTests = await getListRequestTestsService();
    res.status(200).json(requestTests);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneRequestTestByIdController = async (req, res) => {
  try {
    const requestTest = await getOneRequestTestByIdService(req.params.id);
    res.status(200).json(requestTest);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRequestTestByIdController = async (req, res) => {
  try {
    const updatedRequestTest = await updateRequestTestByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Request test updated successfully",
      data: updatedRequestTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRequestTestByIdController = async (req, res) => {
  try {
    await deleteRequestTestByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Request test deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkRequestTestController = async (req, res) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required" });
    }
    const appointmentIds = await getAppointmentIdsForDoctor(doctorId);
    res.json({ appointmentIds });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
