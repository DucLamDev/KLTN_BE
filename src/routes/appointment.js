import express from "express";
import {
  createAppointmentController,
  listAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
} from "../controllers/appointmentController.js";

const routerAppointment = express.Router();

// Tạo cuộc hẹn mới
routerAppointment.post("/", createAppointmentController);

// Lấy danh sách cuộc hẹn
routerAppointment.get("/", listAppointmentsController);

// Lấy chi tiết một cuộc hẹn
routerAppointment.get("/:id", getAppointmentByIdController);

// Cập nhật thông tin cuộc hẹn
routerAppointment.patch("/:id", updateAppointmentController);

// Xóa cuộc hẹn
routerAppointment.delete("/:id", deleteAppointmentController);

export default routerAppointment;
