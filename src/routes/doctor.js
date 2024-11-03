import express from "express";
import {
  completeAppointmentController,
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

routerDoctor.post("/complete", completeAppointmentController);
export default routerDoctor;
