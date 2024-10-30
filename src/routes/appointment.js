// router.js
import express from "express";
import {
  createAppointment,
  listAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentServices.js";

const routerApointment = express.Router();

// Tạo cuộc hẹn mới
routerApointment.post("/", async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(202).json({
      message: "Yêu cầu cuộc hẹn đã được tiếp nhận và đang xử lý",
      appointment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy danh sách cuộc hẹn
routerApointment.get("/", async (req, res) => {
  try {
    const appointments = await listAppointments();
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy chi tiết một cuộc hẹn
routerApointment.get("/:id", async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    res.status(200).send(appointment);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Cập nhật thông tin cuộc hẹn
routerApointment.patch("/:id", async (req, res) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).send(appointment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Xóa cuộc hẹn
routerApointment.delete("/:id", async (req, res) => {
  try {
    const appointment = await deleteAppointment(req.params.id);
    res.status(200).send(appointment);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default routerApointment;
