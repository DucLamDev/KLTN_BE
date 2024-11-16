import {
  createTestTypeService,
  getListTestTypesService,
  getOneTestTypeByIdService,
  updateTestTypeByIdService,
  deleteTestTypeByIdService,
  getTestTypeByEmail,
} from "../services/testTypeServices.js";
// testType TestType
export const createTestTypeController = async (req, res) => {
  try {
    const newTestType = await createTestTypeService(req.body);
    res.status(201).json({
      success: true,
      message: "TestType created successfully",
      data: newTestType,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListTestTypesController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const testType = await getTestTypeByEmail(email);
      res.status(200).json(testType);
    } else {
      const testTypes = await getListTestTypesService();
      res.status(200).json(testTypes);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneTestTypeByIdController = async (req, res) => {
  try {
    const testType = await getOneTestTypeByIdService(req.params.id);
    res.status(200).json(testType);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTestTypeByIdController = async (req, res) => {
  try {
    const updatedTestType = await updateTestTypeByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "TestType updated successfully",
      data: updatedTestType,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTestTypeByIdController = async (req, res) => {
  try {
    await deleteTestTypeByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "TestType deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
