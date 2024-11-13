import express from "express";
import {
  createDiagnosisController,
  getListDiagnosesController,
  getOneDiagnosisByIdController,
  updateDiagnosisByIdController,
  deleteDiagnosisByIdController,
} from "../controllers/diagnosisController.js";

const routerDiagnosis = express.Router();

// Tạo một diagnosis mới
routerDiagnosis.post("/", createDiagnosisController);

// Lấy danh sách tất cả diagnoses (có thể cần role-based access control)
routerDiagnosis.get("/", getListDiagnosesController);

// Lấy chi tiết một diagnosis
routerDiagnosis.get("/:id", getOneDiagnosisByIdController);

// Cập nhật thông tin diagnosis
routerDiagnosis.put("/:id", updateDiagnosisByIdController); // Consider using PATCH for partial updates

// Xóa diagnosis
routerDiagnosis.delete("/:id", deleteDiagnosisByIdController);

export default routerDiagnosis;
