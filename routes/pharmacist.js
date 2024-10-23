import express from "express";
import Pharmacist from "../models/Pharmacist.js";
import { redisClient } from "../redis/redisClient.js";
const router = express.Router();
// Tạo dược sĩ mới
router.post("/", async (req, res) => {
  try {
    const pharmacist = new Pharmacist(req.body);
    await pharmacist.save();
    res.status(201).send(pharmacist);
  } catch (error) {
    res.status(400).send(error);
  }
});

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

// Lấy danh sách dược sĩ
router.get("/", async (req, res) => {
  try {
    let pharmacists;
    const { email } = req.query;
    if (!email) {
      pharmacists = await Pharmacist.find();
    } else pharmacists = await Pharmacist.findOne({ email });
    res.status(200).send(pharmacists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy chi tiết một dược sĩ
router.get("/:id", async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findById(req.params.id);
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin dược sĩ
router.patch("/:id", async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa dược sĩ
router.delete("/:id", async (req, res) => {
  try {
    const pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
