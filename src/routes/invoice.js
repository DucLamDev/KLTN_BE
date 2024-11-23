import express from "express";
import {
  createInvoiceController,
  getInvoicesController,
  getInvoiceByIdController,
  updateInvoiceStatusController,
  deleteInvoiceController,
} from "../controllers/invoiceController.js";

const routerInvoice = express.Router();

// POST: Tạo hóa đơn
routerInvoice.post("/", createInvoiceController);

// GET: Lấy danh sách hóa đơn
routerInvoice.get("/", getInvoicesController);

// GET: Lấy hóa đơn theo ID
routerInvoice.get("/:id", getInvoiceByIdController);

// PATCH: Cập nhật trạng thái thanh toán của hóa đơn
routerInvoice.patch("/update-status", updateInvoiceStatusController);

// DELETE: Xóa hóa đơn theo ID
routerInvoice.delete("/:id", deleteInvoiceController);

export default routerInvoice;
