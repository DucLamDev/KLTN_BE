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

routerDoctor.get("/specializations", getDepartmentNameController); // không có kafka

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);

routerDoctor.get("/:roomNumber", getListAppointment);// đổi queue/000 thành routes này

// Tạo request xét nghiệm
routerDoctor.post("/create-requestTest", );

routerDoctor.post("/complete", completeAppointmentController);// hoàn thành ca khám

export default routerDoctor;
