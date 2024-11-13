
import {
  createAdminService,
  getListAdminsService,
  getOneAdminByIdService,
  updateAdminByIdService,
  deleteAdminByIdService,
  getAdminByEmail,
} from "../services/adminServices.js";

export const createAdminController = async (req, res) => {
  try {
    const newAdmin = await createAdminService(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListAdminsController = async (req, res) => {
  try {
    const admins = await getListAdminsService();
    res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneAdminByIdController = async (req, res) => {
  try {
    const admin = await getOneAdminByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneAdminByEmailController = async (req, res) => {
  try {
    const { email } = req.query;
    const admin = await getAdminByEmail(email);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
};
export const updateAdminByIdController = async (req, res) => {
  try {
    const updatedAdmin = await updateAdminByIdService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAdminByIdController = async (req, res) => {
  try {
    await deleteAdminByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
// adminController.js
import adminService from '../services/adminServices.js';

export const createAdmin = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const admin = await adminService.getAdminById(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        const admin = await adminService.updateAdmin(req.params.id, req.body);
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        await adminService.deleteAdmin(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
