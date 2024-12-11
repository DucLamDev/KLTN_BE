import {
  createTestService,
  getListTestsService,
  getOneTestByIdService,
  updateTestByIdService,
  deleteTestByIdService,
  getPatientIdsForDoctor,
  getMostRecentTest,
  getOneTestByAppointmentIdService,
} from "../services/testServices.js";

export const createTestController = async (req, res) => {
  try {
    const newTest = await createTestService(req.body);
    res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: newTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListTestsController = async (req, res) => {
  try {
    const { appointmentId } = req.query;
    if (appointmentId) {
      const test = await getOneTestByAppointmentIdService(appointmentId);
      res.status(200).json(test);
    } else {
      const test = await getMostRecentTest(patientId, doctorId);
      if (test) res.json(test);
      else res.json(null);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneTestByIdController = async (req, res) => {
  try {
    const test = await getOneTestByIdService(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTestByIdController = async (req, res) => {
  try {
    const updatedTest = await updateTestByIdService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTestByIdController = async (req, res) => {
  try {
    await deleteTestByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkTestController = async (req, res) => {
  try {
    const { doctorId } = req.query;
    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required" });
    }
    const appointmentIds = await getPatientIdsForDoctor(doctorId);
    res.json({ appointmentIds });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
