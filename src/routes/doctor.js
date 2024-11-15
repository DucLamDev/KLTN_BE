import express from "express";
import {
  completeAppointmentController,
  createDoctorController,
  createPrescriptionController,
  createReExaminationController,
  createServiceListController,
  getAppointmentsByDateController,
  getListDoctorsController,
  getListAppointment,
  getOneDoctorController,
  getSpecializationsController,
  updateDoctorOnlineStatusController,
} from "../controllers/doctorController.js";

const routerDoctor = express.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", createPrescriptionController);

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);

// Tạo request xét nghiệm
// routerDoctor.post("/create-requestTest", );

routerDoctor.post("/complete", completeAppointmentController); // hoàn thành ca khám

routerDoctor.get("/specializations", getSpecializationsController); // không có kafka
// Tạo lịch tái khám cho bệnh nhân
routerDoctor.post("/reExamination", createReExaminationController);

// Lấy danh sách các ca khám mà bác sĩ đã hoàn thành trong ngày cụ thể
// vd: GET http://.../api/doctors/BS-ABCDEF/appointments/2024-11-09
routerDoctor.get("/get-appointments/:roomNumber", getListAppointment); // đổi queue/000 thành routes này
routerDoctor.get("/:id", getOneDoctorController);
routerDoctor.get(
  "/:doctorId/appointments/:date",
  getAppointmentsByDateController
);

// Cập nhật trạng thái Online và số phòng của 1 Bác sĩ
routerDoctor.patch(
  "/:doctorId/updateRoomNumber",
  updateDoctorOnlineStatusController
);
// lấy danh sách bác sĩ thuộc khoa X hoặc theo email nếu không truyền tham số thì sẽ lấy toàn bộ danh sách
routerDoctor.get("/", getListDoctorsController);

// Tạo 1 bác sĩ
routerDoctor.post("/", createDoctorController);

export default routerDoctor;
