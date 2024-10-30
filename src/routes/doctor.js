import express from "express";
import {
  createPrescriptionController,
  createServiceListController
} from "../controllers/doctorController.js";

const routerDoctor = express.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", createPrescriptionController);

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);

export default routerDoctor;
