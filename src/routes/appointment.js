import express from "express";
import {
  createAppointmentController,
  listAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
} from "../controllers/appointmentController.js";

const routerAppointment = express.Router();

//lấy dữ liệu test màn hình bác sĩ http://localhost:3000/api/appointments/

// Tạo cuộc hẹn mới
routerAppointment.post("/", createAppointmentController);

// Lấy danh sách cuộc hẹn
routerAppointment.get("/", listAppointmentsController); // Admin, doctors

// Lấy chi tiết một cuộc hẹn
routerAppointment.get("/:id", getAppointmentByIdController);

// Cập nhật thông tin cuộc hẹn
routerAppointment.patch("/:id", updateAppointmentController);

// Xóa cuộc hẹn
routerAppointment.delete("/:id", deleteAppointmentController);

export default routerAppointment;
