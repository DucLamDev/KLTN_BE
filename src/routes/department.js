import express from 'express';
import {
    createDepartmentController,
    listDepartmentsController,
    getDepartmentByIdController,
    updateDepartmentController,
    deleteDepartmentController
} from '../controllers/departmentController.js';

const routerDepartment = express.Router();
//Admin

// Tạo department mới
routerDepartment.post("/", createDepartmentController);

// Lấy danh sách departments
routerDepartment.get("/", listDepartmentsController);

// Lấy chi tiết một department
routerDepartment.get("/:id", getDepartmentByIdController);

// Cập nhật thông tin department
routerDepartment.patch("/:id", updateDepartmentController);

// Xóa department
routerDepartment.delete("/:id", deleteDepartmentController);

export default routerDepartment;
