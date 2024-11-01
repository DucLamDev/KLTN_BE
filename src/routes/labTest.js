import express from 'express';
import {
    createLabTestController,
    listLabTestsController,
    getLabTestByIdController,
    updateLabTestController,
    deleteLabTestController
} from '../controllers/labTestController.js';

const routerLabTest = express.Router();

// Tạo lab test mới
routerLabTest.post("/", createLabTestController);

// Lấy danh sách lab tests
routerLabTest.get("/", listLabTestsController);

// Lấy chi tiết một lab test
routerLabTest.get("/:id", getLabTestByIdController);

// Cập nhật thông tin lab test
routerLabTest.patch("/:id", updateLabTestController);

// Xóa lab test
routerLabTest.delete("/:id", deleteLabTestController);

export default routerLabTest;
