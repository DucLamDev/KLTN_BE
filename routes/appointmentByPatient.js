import express from "express";
import AppointmentByPatient from "../models/AppointmentByPatient.js";

const router = express.Router();

// Tạo cuộc hẹn mới
router.post("/", async (req, res) => {
  try {
    const appointmentByPatient = new AppointmentByPatient(req.body);
    await appointmentByPatient.save();
    res.status(201).send(appointmentByPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách cuộc hẹn
router.get("/", async (req, res) => {
  try {
    const appointmentByPatientList = await AppointmentByPatient.find();
    res.status(200).send(appointmentByPatientList);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
