import express from "express";
import * as serviceController from "../controllers/serviceController.js";

const routerService = express.Router();

// Các route CRUD cho dịch vụ
routerService.post("/", serviceController.createService); // Tạo dịch vụ
routerService.get("/", serviceController.getAllServices); // Lấy tất cả dịch vụ
routerService.get("/:id", serviceController.getServiceById); // Lấy dịch vụ theo ID
routerService.put("/:id", serviceController.updateService); // Cập nhật dịch vụ
routerService.delete("/:id", serviceController.deleteService); // Xóa dịch vụ

export default routerService;
