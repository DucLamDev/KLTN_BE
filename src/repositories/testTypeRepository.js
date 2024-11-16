import TestType from "../models/TestType.js";
export const createTestType = async (testTypeData) => {
  const testType = new TestType(testTypeData);
  return await testType.save();
};

export const getListTestTypes = async () => {
  return await TestType.find();
};

export const findTestType = async (query) => {
  return await TestType.findOne(query);
};

export const getOneTestTypeById = async (id) => {
  return await TestType.findById(id);
};

export const updateTestTypeById = async (id, updateData) => {
  return await TestType.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteTestTypeById = async (id) => {
  return await TestType.findByIdAndDelete(id);
};
