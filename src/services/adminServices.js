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
