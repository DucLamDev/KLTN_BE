import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// Tạo bệnh nhân mới
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách bệnh nhân
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy chi tiết một bệnh nhân
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin bệnh nhân
router.patch("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa bệnh nhân
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).send();
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy bệnh nhân theo accountId
router.get("/by-account/:accountId", async (req, res) => {
  try {
    const { accountId } = req.params;
    const patients = await Patient.findOne({ accountId });

    if (patients.length === 0) {
      return res
        .status(404)
        .send({ message: "Không tìm thấy bệnh nhân với accountId này" });
    }

    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: "Lỗi server", error: error.message });
  }
});

export default router;
