
import express from 'express';
import Doctor from '../models/Doctor.js';
const router = express.Router();
// Tạo bác sĩ mới
router.post('/', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách bác sĩ
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).send(doctors);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một bác sĩ
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).send();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin bác sĩ
router.patch('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doctor) return res.status(404).send();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa bác sĩ
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) return res.status(404).send();
        res.status(200).send(doctor);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
