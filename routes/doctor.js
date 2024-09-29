import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// Tạo bác sĩ mới
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách bác sĩ
router.get("/", async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};

    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await Doctor.find(query);

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bác sĩ nào với chuyên khoa này" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

// Lấy danh sách các chuyên ngành khác nhau
router.get("/specializations", async (req, res) => {
  try {
    const specializations = await Doctor.distinct("specialization");
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message,
    });
  }
});

// Lấy chi tiết một bác sĩ
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin bác sĩ
router.patch("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa bác sĩ
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
