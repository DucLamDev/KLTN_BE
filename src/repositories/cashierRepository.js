import Cashier from "../models/Cashier.js";

export const createCashier = async (cashierData) => {
  const cashier = new Cashier(cashierData);
  return await cashier.save();
};

export const getListCashiers = async () => {
  return await Cashier.find();
};

export const findCashier = async (query) => {
  return await Cashier.find(query);
};

export const getOneCashierById = async (id) => {
  return await Cashier.findById(id);
};

export const updateCashierById = async (id, updateData) => {
  return await Cashier.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteCashierById = async (id) => {
  return await Cashier.findByIdAndDelete(id);
};
