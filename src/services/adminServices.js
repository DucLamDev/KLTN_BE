
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

