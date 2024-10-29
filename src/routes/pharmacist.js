import express from "express";
import Pharmacist from "../models/Pharmacist.js";
import { redisClient } from "../redis/redisClient.js";
import PrescriptionBill from "../models/PrescriptionBill.js";
const router = express.Router();

router.get("/prescriptions", async (req, res) => {
  // const { roomNumber } = req.params;
  const queueKey = `queue:Pharmacist`;

  try {
    // Lấy tất cả bệnh nhân từ hàng đợi Redis
    const prescriptionsData = await redisClient.lRange(queueKey, 0, -1);

    if (!prescriptionsData.length) {
      return res
        .status(404)
        .json({ success: false, message: "No prescription in queue" });
    }

    // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
    const parsedprescriptionsData = prescriptionsData
      .map((data) => {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error(`Invalid JSON data: ${data}`);
          return null; // Trả về null nếu dữ liệu không hợp lệ
        }
      })
      .filter((data) => data !== null); // Lọc bỏ những phần tử không hợp lệ

    res.status(200).json({ success: true, data: parsedprescriptionsData });
  } catch (err) {
    console.error("Error retrieving patients from queue:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post('/create', async (req, res) => {
  try {
      const { patientId, doctorId, pharmacistId, services } = req.body;

      const totalAmount = services.reduce((total, service) => total + service.cost, 0);

      const newPrescriptionBill = new PrescriptionBill({
          patientId,
          doctorId,
          pharmacistId,
          services,
          totalAmount
      });

      // Lưu hóa đơn vào cơ sở dữ liệu
      const savedTestBill = await newPrescriptionBill.save();
      res.status(200).json(savedTestBill);
  } catch (error) {
      res.status(500).json({ message: 'Error creating test bill', error });
  }
});

router.get('/prescriptionBill/:id', async (req, res) => {
   try {
     const bill = await PrescriptionBill.findById(req.params.id);
     if(!bill) return res.status(400).send();
     res.status(200).send(bill);
   } catch (error) {
    res.status(500).send(error);   
   }
});

export default router;
