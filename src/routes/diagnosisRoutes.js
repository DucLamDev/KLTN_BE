import express from 'express';
import {
  createDiagnosisController,
  listDiagnosisController,
  getDiagnosisByIdController,
  updateDiagnosisController,
  deleteDiagnosisController
} from '../controllers/diagnosisController.js';

const routerDiagnosis = express.Router();

// Tạo một diagnosis mới
routerDiagnosis.post("/", createDiagnosisController);

// Lấy danh sách tất cả diagnoses (có thể cần role-based access control)
routerDiagnosis.get("/", listDiagnosisController); 

// Lấy chi tiết một diagnosis
routerDiagnosis.get("/:id", getDiagnosisByIdController);

// Cập nhật thông tin diagnosis
routerDiagnosis.put("/:id", updateDiagnosisController); // Consider using PATCH for partial updates

// Xóa diagnosis
routerDiagnosis.delete("/:id", deleteDiagnosisController);

export default routerDiagnosis;