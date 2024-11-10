import express from "express";
import * as serviceController from "../controllers/serviceController.js";

const routerService = express.Router();

// Các route CRUD cho dịch vụ
routerService.post("/services", serviceController.createService); // Tạo dịch vụ
routerService.get("/services", serviceController.getAllServices); // Lấy tất cả dịch vụ
routerService.get("/services/:id", serviceController.getServiceById); // Lấy dịch vụ theo ID
routerService.put("/services/:id", serviceController.updateService); // Cập nhật dịch vụ
routerService.delete("/services/:id", serviceController.deleteService); // Xóa dịch vụ

export default routerService;
