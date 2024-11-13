import express from "express";
import AppointmentByPatient from "../models/AppointmentByPatient.js";
const router = express.Router();



router.post("/", async (req, res) => {
  try {
    const appointmentByPatient = new AppointmentByPatient(req.body);
    await appointmentByPatient.save();
    res.status(201).send(appointmentByPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

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
    let appointmentByPatientList;
    const { id } = req.query;
    if (!id) {
      appointmentByPatientList = await AppointmentByPatient.find();
    } else
      appointmentByPatientList = await AppointmentByPatient.findOne({ id });
    res.status(200).send(appointmentByPatientList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Xóa cuộc hẹn
router.delete("/", async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.status(400).send({ message: "Patient ID is required" });
    }
    const result = await AppointmentByPatient.findOneAndDelete({ _id });
    if (!result) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.status(200).send({
      message: "Appointment deleted successfully",
      deletedAppointment: result,
    });
  } catch (error) {
    res.status(500).send(error) .send({ message: "Error deleting appointment", error: error.message });
  }
});
export default router;
