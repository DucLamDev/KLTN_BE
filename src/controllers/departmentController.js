import {
    createDepartments,
    listDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../services/departmentServices.js';

// Tạo một department mới
export const createDepartmentController = async (req, res) => {
    try {
        const department = await createDepartments(req.body);
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy danh sách departments
export const listDepartmentsController = async (req, res) => {
    try {
        const departments = await listDepartments();
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết một department
export const getDepartmentByIdController = async (req, res) => {
    try {
        const department = await getDepartmentById(req.params.id);
        res.status(200).json(department);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin department
export const updateDepartmentController = async (req, res) => {
    try {
        const department = await updateDepartment(req.params.id, req.body);
        res.status(200).json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa department
export const deleteDepartmentController = async (req, res) => {
    try {
        await deleteDepartment(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
