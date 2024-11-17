import {
  createTestService,
  getListTestsService,
  getOneTestByIdService,
  updateTestByIdService,
  deleteTestByIdService,
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
    const tests = await getListTestsService();
    res.status(200).json(tests);
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
