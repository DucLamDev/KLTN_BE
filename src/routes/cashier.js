import express from "express";
import {
  createInvoiceController,
  updateInvoiceStatusController,
  createCashierController,
  getListCashiersController,
  getOneCashierByIdController,
  updateCashierByIdController,
  deleteCashierByIdController,
  getOneCashierByEmailController,
} from "../controllers/cashierController.js";
const routerCashier = express.Router();

// Tạo 1 cashier
routerCashier.post("/", createCashierController);

//Lấy cashier theo email
routerCashier.get("/", getOneCashierByEmailController);

// Lấy danh sách cashiers
routerCashier.get("/", getListCashiersController);

// Lấy 1 cashier theo ID
routerCashier.get("/:id", getOneCashierByIdController);

// Cập nhật 1 cashier theo ID
routerCashier.put("/:id", updateCashierByIdController);

// Xoá 1 cashier theo ID
routerCashier.delete("/:id", deleteCashierByIdController);

// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
routerCashier.post("/create-invoice", createInvoiceController);

routerCashier.patch("/update-invoice-status", updateInvoiceStatusController);
export default routerCashier;
