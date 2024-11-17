import Test from "../models/Test.js";
import MedicineWarehouse from "../models/MedicineWarehouse.js";
import Medication from "../models/Medication.js";

export const createTestRepo = async (testData) => {
  const test = new Test(testData);
  return await test.save();
};

export const getListTestsRepo = async () => {
  return await Test.find();
};

export const getOneTestByIdRepo = async (id) => {
  return await Test.findById(id);
};

export const updateTestByIdRepo = async (id, updateData) => {
  return await Test.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteTestByIdRepo = async (id) => {
  return await Test.findByIdAndDelete(id);
};
