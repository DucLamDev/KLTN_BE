import Diagnosis from "../models/Diagnosis.js";

export const createDiagnosis = async (diagnosisData) => {
  const diagnosis = new Diagnosis(diagnosisData);
  return await diagnosis.save();
};

export const getListDiagnoses = async () => {
  return await Diagnosis.find();
};

export const getOneDiagnosisById = async (id) => {
  return await Diagnosis.findById(id);
};

export const updateDiagnosisById = async (id, updateData) => {
  return await Diagnosis.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteDiagnosisById = async (id) => {
  return await Diagnosis.findByIdAndDelete(id);
};
