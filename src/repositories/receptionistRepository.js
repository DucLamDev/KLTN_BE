import Receptionist from "../models/Receptionist.js";

export const createReceptionist = async (receptionistData) => {
  const receptionist = new Receptionist(receptionistData);
  return await receptionist.save();
};

export const getListReceptionists = async () => {
  return await Receptionist.find();
};

export const findReceptionist = async (query) => {
  return await Receptionist.findOne(query);
};

export const getOneReceptionistById = async (id) => {
  return await Receptionist.findById(id);
};

export const updateReceptionistById = async (id, updateData) => {
  return await Receptionist.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteReceptionistById = async (id) => {
  return await Receptionist.findByIdAndDelete(id);
};
