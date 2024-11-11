import {
  createAdminService,
  getListAdminsService,
  getOneAdminByIdService,
  updateAdminByIdService,
  deleteAdminByIdService,
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
