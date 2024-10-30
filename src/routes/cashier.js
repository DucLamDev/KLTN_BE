import express from 'express';
import { createInvoiceController, updateInvoiceStatusController } from '../controllers/cashierController.js';

const routerCashier = express.Router();

// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
routerCashier.post("/create-invoice", createInvoiceController);
  
routerCashier.patch("/update-invoice-status", updateInvoiceStatusController);

export default routerCashier;
