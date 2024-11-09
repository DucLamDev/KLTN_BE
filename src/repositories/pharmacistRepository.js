import Pharmacist from '../models/Pharmacist.js';

export const createPharmacist = async (pharmacistData) => {
  const pharmacist = new Pharmacist(pharmacistData);
  return await pharmacist.save();
};

export const getListPharmacists = async () => {
  return await Pharmacist.find()
};
export const findPharmacists = async (query) => {
  return await Pharmacist.find(query);
};

export const getOnePharmacistById = async (id) => {
  return await Pharmacist.findById(id)    
};

export const updatePharmacistById = async (id, updateData) => {
  return await Pharmacist.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deletePharmacistById = async (id) => {
  return await Pharmacist.findByIdAndDelete(id);
};
