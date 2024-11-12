import {
  createRequestTest,
  getListRequestTests,
  getOneRequestTestById,
  updateRequestTestById,
  deleteRequestTestById,
} from "../repositories/requestTestRepository.js";

export const createRequestTestService = async (requestTestData) => {
  try {
    return await createRequestTest(requestTestData);
  } catch (error) {
    throw new Error("Error creating request test: " + error.message);
  }
};

export const getListRequestTestsService = async () => {
  try {
    return await getListRequestTests();
  } catch (error) {
    throw new Error("Error fetching request test list: " + error.message);
  }
};

export const getOneRequestTestByIdService = async (id) => {
  try {
    const requestTest = await getOneRequestTestById(id);
    if (!requestTest) {
      throw new Error("Request test not found");
    }
    return requestTest;
  } catch (error) {
    throw new Error("Error fetching request test: " + error.message);
  }
};

export const updateRequestTestByIdService = async (id, updateData) => {
  try {
    const updatedRequestTest = await updateRequestTestById(id, updateData);
    if (!updatedRequestTest) {
      throw new Error("Request test not found");
    }
    return updatedRequestTest;
  } catch (error) {
    throw new Error("Error updating request test: " + error.message);
  }
};

export const deleteRequestTestByIdService = async (id) => {
  try {
    const deletedRequestTest = await deleteRequestTestById(id);
    if (!deletedRequestTest) {
      throw new Error("Request test not found");
    }
    return deletedRequestTest;
  } catch (error) {
    throw new Error("Error deleting request test: " + error.message);
  }
};
