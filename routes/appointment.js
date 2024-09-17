
import express from 'express';
import Appointment from '../models/Appointment.js';
const router = express.Router();
// Tạo cuộc hẹn mới
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách cuộc hẹn
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('patientId').populate('doctorId');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một cuộc hẹn
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('patientId').populate('doctorId');
        if (!appointment) return res.status(404).send();
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin cuộc hẹn
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) return res.status(404).send();
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa cuộc hẹn
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).send();
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
