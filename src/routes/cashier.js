import express from 'express';
import Cashier from '../models/Cashier.js';

const routerCashier = express.Router();

// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
routerCashier.post("/create-invoice", async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
      const result = await createInvoice(patientId, doctorId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  routerCashier.patch("/update-invoice-status", async (req, res) => {
    const { invoiceId, paymentStatus } = req.body;
    try {
      const result = await updateInvoiceStatus(invoiceId, paymentStatus);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  routerCashier.patch("/:id", async (req, res) => {
    try {
      const cashier = await Cashier.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!cashier) return res.status(404).send();
      res.status(200).send(cashier);
    } catch (error) {
      res.status(400).send(error);
    }
  });

export default routerCashier;
