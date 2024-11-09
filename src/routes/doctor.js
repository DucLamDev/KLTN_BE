import express from "express";
import {
  completeAppointmentController,
  createPrescriptionController,
  createServiceListController,
  getAppointmentsByDateController,
  getDoctorsController,
  getListAppointment,
  getOneDoctorController,
  getSpecializationsController,
} from "../controllers/doctorController.js";

const routerDoctor = express.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", createPrescriptionController);

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);



// Tạo request xét nghiệm
// routerDoctor.post("/create-requestTest", );

routerDoctor.post("/complete", completeAppointmentController);// hoàn thành ca khám

routerDoctor.get("/specializations", getSpecializationsController); // không có kafka

// Lấy danh sách các ca khám mà bác sĩ đã hoàn thành trong ngày cụ thể
// vd: GET http://.../api/doctors/BS-ABCDEF/appointments/2024-11-09
routerDoctor.get("/:doctorId/appointments/:date", getAppointmentsByDateController);

routerDoctor.get("/:id", getOneDoctorController);
routerDoctor.get("/:roomNumber", getListAppointment);// đổi queue/000 thành routes này

// lấy danh sách bác sĩ thuộc khoa X hoặc theo email nếu không truyền tham số thì sẽ lấy toàn bộ danh sách
routerDoctor.get("/", getDoctorsController);


export default routerDoctor;
