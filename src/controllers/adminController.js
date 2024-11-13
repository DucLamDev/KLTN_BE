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
