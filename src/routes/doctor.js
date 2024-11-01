import express from "express";
import {
  createPrescriptionController,
  createServiceListController,
  getDepartmentNameController,
  getListAppointment
} from "../controllers/doctorController.js";

const routerDoctor = express.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", createPrescriptionController);

routerDoctor.get("/specializations", getDepartmentNameController);
// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);

routerDoctor.get("/:roomNumber", getListAppointment);
// Tạo request xét nghiệm

export default routerDoctor;
