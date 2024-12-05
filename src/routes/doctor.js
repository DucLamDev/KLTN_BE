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
  createRequestTestController,
} from "../controllers/doctorController.js";
import { redisClient } from "../redis/redisClient.js";

const routerDoctor = express.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", createPrescriptionController);

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", createServiceListController);

// Tạo request xét nghiệm
routerDoctor.post("/create-request-test", createRequestTestController);

routerDoctor.post("/complete", completeAppointmentController); // hoàn thành ca khám

routerDoctor.get("/specializations", getSpecializationsController); // không có kafka
// Tạo lịch tái khám cho bệnh nhân
routerDoctor.post("/reExamination", createReExaminationController);

// Lấy danh sách các ca khám mà bác sĩ đã hoàn thành trong ngày cụ thể
// vd: GET http://.../api/doctors/BS-ABCDEF/appointments/2024-11-09
routerDoctor.get("/get-appointments/:roomNumber", async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientsData = await redisClient.lRange(queueKey, 0, -1);

    if (!patientsData.length) {
      return res
        .status(404)
        .json({ success: false, message: "No patients in queue" });
    }

    // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
    const parsedPatientsData = patientsData
      .map((data) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error(`Invalid JSON data: ${data}`);
          return null; // Trả về null nếu dữ liệu không hợp lệ
        }
      })
      .filter((data) => data !== null); // Lọc bỏ những phần tử không hợp lệ

    res.status(200).json({ success: true, data: parsedPatientsData });
  } catch (err) {
    console.error("Error retrieving patients from queue:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}); // đổi queue/000 thành routes này
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
