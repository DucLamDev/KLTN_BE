import {
  createTestType,
  getListTestTypes,
  getOneTestTypeById,
  updateTestTypeById,
  deleteTestTypeById,
  findTestType,
} from "../repositories/testTypeRepository.js";
export const createTestTypeService = async (testTypeData) => {
  try {
    return await createTestType(testTypeData);
  } catch (error) {
    throw new Error("Error creating testType: " + error.message);
  }
};

export const getTestTypeByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await findTestType(query);
};
export const getListTestTypesService = async () => {
  try {
    return await getListTestTypes();
  } catch (error) {
    throw new Error("Error fetching TestType list: " + error.message);
  }
};

export const getOneTestTypeByIdService = async (id) => {
  try {
    const testType = await getOneTestTypeById(id);
    if (!testType) {
      throw new Error("TestType not found");
    }
    return testType;
  } catch (error) {
    throw new Error("Error fetching TestType: " + error.message);
  }
};

export const updateTestTypeByIdService = async (id, updateData) => {
  try {
    const updatedTestType = await updateTestTypeById(id, updateData);
    if (!updatedTestType) {
      throw new Error("TestType not found");
    }
    return updatedTestType;
  } catch (error) {
    throw new Error("Error updating TestType: " + error.message);
  }
};

export const deleteTestTypeByIdService = async (id) => {
  try {
    const deletedTestType = await deleteTestTypeById(id);
    if (!deletedTestType) {
      throw new Error("TestType not found");
    }
    return deletedTestType;
  } catch (error) {
    throw new Error("Error deleting TestType: " + error.message);
  }
};
