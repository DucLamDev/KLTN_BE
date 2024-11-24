import {
  createAdmin,
  getListAdmins,
  getOneAdminById,
  updateAdminById,
  deleteAdminById,
  findAdmin,
  getAppointmentsBySpecialization,
  getCompletedAppointmentsByMonth,
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

export const getAppointmentsBySpecializationService = async () => {
  try {
    const result = await getAppointmentsBySpecialization();
    if (!result) {
      throw new Error("Error");
    }
    return result;
  } catch (error) {
    console.error("Lỗi khi thống kê cuộc hẹn theo chuyên khoa:", error);
    throw error;
  }
};

export const getCompletedAppointmentsByMonthService = async (year) => {
  try {
    const result = await getCompletedAppointmentsByMonth(year);
    if (!result) {
      throw new Error("Error");
    }
    return result;
  } catch (error) {}
};
