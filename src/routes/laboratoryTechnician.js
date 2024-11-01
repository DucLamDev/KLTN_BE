import express from 'express';
import {
    createLaboratoryTechnicianController,
    listLaboratoryTechniciansController,
    getLaboratoryTechnicianByIdController,
    updateLaboratoryTechnicianController,
    deleteLaboratoryTechnicianController
} from '../controllers/laboratoryTechnicianController.js';

const routerLaboratoryTechnician = express.Router();

// Tạo laboratory technician mới
routerLaboratoryTechnician.post("/", createLaboratoryTechnicianController);

// Lấy danh sách laboratory technicians
routerLaboratoryTechnician.get("/", listLaboratoryTechniciansController);

// Lấy chi tiết một laboratory technician
routerLaboratoryTechnician.get("/:id", getLaboratoryTechnicianByIdController);

// Cập nhật thông tin laboratory technician
routerLaboratoryTechnician.patch("/:id", updateLaboratoryTechnicianController);

// Xóa laboratory technician
routerLaboratoryTechnician.delete("/:id", deleteLaboratoryTechnicianController);

export default routerLaboratoryTechnician;
