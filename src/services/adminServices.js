
import {
  createAdmin,
  getListAdmins,
  getOneAdminById,
  updateAdminById,
  deleteAdminById,
  findAdmin,
} from "../repositories/adminRepository.js";

export const createAdminService = async (adminData) => {
  try {
    return await createAdmin(adminData);
  } catch (error) {
    throw new Error("Error creating admin: " + error.message);
  }
};

export const getAdminByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }

  return await findAdmin(query);
};
export const getListAdminsService = async () => {
  try {
    return await getListAdmins();
  } catch (error) {
    throw new Error("Error fetching admin list: " + error.message);
  }
};

export const getOneAdminByIdService = async (id) => {
  try {
    const admin = await getOneAdminById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  } catch (error) {
    throw new Error("Error fetching admin: " + error.message);
  }
};

export const updateAdminByIdService = async (id, updateData) => {
  try {
    const updatedAdmin = await updateAdminById(id, updateData);
    if (!updatedAdmin) {
      throw new Error("Admin not found");
    }
    return updatedAdmin;
  } catch (error) {
    throw new Error("Error updating admin: " + error.message);
  }
};

export const deleteAdminByIdService = async (id) => {
  try {
    const deletedAdmin = await deleteAdminById(id);
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }
    return deletedAdmin;
  } catch (error) {
    throw new Error("Error deleting admin: " + error.message);
  }
};

// adminService.js
import adminDAL from '../repositories/adminRepository.js';
import bcrypt from 'bcryptjs';

const createAdmin = async (adminData) => {
    // Kiểm tra trùng lặp email
    const existingAdmin = await adminDAL.getAdminById(adminData._id);
    if (existingAdmin) {
        throw new Error('Admin ID already exists');
    }
    
    // Hash mật khẩu trước khi lưu
    adminData.password = await bcrypt.hash(adminData.password, 12);

    return await adminDAL.createAdmin(adminData);
};

const getAdminById = async (id) => {
    const admin = await adminDAL.getAdminById(id);
    if (!admin) {
        throw new Error('Admin not found');
    }
    return admin;
};

const getAllAdmins = async () => {
    return await adminDAL.getAllAdmins();
};

const updateAdmin = async (id, updateData) => {
    const admin = await adminDAL.getAdminById(id);
    if (!admin) {
        throw new Error('Admin not found');
    }

    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    return await adminDAL.updateAdmin(id, updateData);
};

const deleteAdmin = async (id) => {
    const admin = await adminDAL.getAdminById(id);
    if (!admin) {
        throw new Error('Admin not found');
    }
    return await adminDAL.deleteAdmin(id);
};

export default {
    createAdmin,
    getAdminById,
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
};
>>>>>>> code-test
