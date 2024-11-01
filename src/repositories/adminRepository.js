import Admin from '../models/Admin.js';

export const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};

export const getListAdmins = async () => {
  return await Admin.find()
};

export const getOneAdminById = async (id) => {
  return await Admin.findById(id)    
};

export const updateAdminById = async (id, updateData) => {
  return await Admin.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteAdminById = async (id) => {
  return await Admin.findByIdAndDelete(id);
};
