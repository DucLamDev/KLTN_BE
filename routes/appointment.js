import express from "express";
import Appointment from "../models/Appointment.js";
import { sendMessage } from "../kafka/producer.js"; // Kafka producer để gửi thông tin cuộc hẹn đến hàng đợi chuyên khoa

const router = express.Router();

// Tạo cuộc hẹn mới
router.post("/", async (req, res) => {
  const { patientId, appointmentDate, reason, specialization } = req.body;

  if (!patientId || !appointmentDate || !specialization) {
    return res.status(400).json({
      message: "patientId, appointmentDate và specialization là bắt buộc",
    });
  }

  const appointmentRequest = {
    patientId,
    appointmentDate,
    reason,
    specialization, 
  };
  const appointment = await Appointment.create({ patientId, appointmentDate, reason, specialization });
  await appointment.save();

  try {
    await sendMessage(`department-${specialization}-queue`, appointmentRequest);
    res
      .status(202)
      .json({ message: "Yêu cầu cuộc hẹn đã được tiếp nhận và đang xử lý" });
  } catch (err) {
    res.status(500).json({
      message: "Không thể xử lý yêu cầu cuộc hẹn",
      error: err.message,
    });
  }
});

router.post("/api", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Lấy danh sách cuộc hẹn
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate("doctorId");
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy chi tiết một cuộc hẹn
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId");
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin cuộc hẹn
router.patch("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa cuộc hẹn
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).send();
    res.status(200).send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
