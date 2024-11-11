import express from "express";
import {
  createLaboratoryTechnicianController,
  listLaboratoryTechniciansController,
  getLaboratoryTechnicianByIdController,
  updateLaboratoryTechnicianController,
  deleteLaboratoryTechnicianController,
  getOneLaboratoryTechnicianByEmailController,
} from "../controllers/laboratoryTechnicianController.js";

const routerLaboratoryTechnician = express.Router();

// Tạo laboratory technician mới
routerLaboratoryTechnician.post("/", createLaboratoryTechnicianController); // Admin

// Lấy danh sách laboratory technicians
routerLaboratoryTechnician.get("/", listLaboratoryTechniciansController); // ADmin

//Lấy cashier theo email
routerLaboratoryTechnician.get(
  "/",
  getOneLaboratoryTechnicianByEmailController
);

// Lấy chi tiết một laboratory technician
routerLaboratoryTechnician.get("/:id", getLaboratoryTechnicianByIdController);

// Cập nhật thông tin laboratory technician
routerLaboratoryTechnician.patch("/:id", updateLaboratoryTechnicianController);

// Xóa laboratory technician
routerLaboratoryTechnician.delete("/:id", deleteLaboratoryTechnicianController);

export default routerLaboratoryTechnician;
