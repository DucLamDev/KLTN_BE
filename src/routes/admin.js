import express from "express";
import {
  createAdminController,
  getListAdminsController,
  getOneAdminByIdController,
  updateAdminByIdController,
  deleteAdminByIdController,
} from "../controllers/adminController.js";

const router = express.Router();

// Tạo 1 admin
router.post("/", createAdminController);

// Lấy danh sách tất cả admin
router.get("/", getListAdminsController);

// Lấy 1 admin theo ID
router.get("/:id", getOneAdminByIdController);

// Cập nhật 1 admin theo ID
router.put("/:id", updateAdminByIdController);

// Xoá 1 admin theo ID
router.delete("/:id", deleteAdminByIdController);

export default router;
