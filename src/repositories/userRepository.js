import User from "../models/User.js";

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getListUsers = async () => {
  return await User.find();
};

export const getOneUserById = async (id) => {
  return await User.findById(id);
};

export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const findByRole = (role) => {
  return User.find({ role });
};

export const updateFcmToken = (userId, fcmToken) => {
  return User.findByIdAndUpdate(userId, { fcmToken }, { new: true });
};
