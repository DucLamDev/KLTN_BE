
import express from 'express';
import Appointment from '../models/Appointment.js';
import { sendMessage } from '../kafka/producer.js';
const router = express.Router();
// Tạo cuộc hẹn mới
router.post('/', async (req, res) => {
    const { patientId, appointmentDate, reason } = req.body;
    
    if (!patientId || !appointmentDate) {
        return res.status(400).json({ message: 'patientId and appointmentDate are required' });
    }

    const appointmentRequest = {
        patientId,
        appointmentDate,
        reason,
    };

    try {
        await sendMessage('appointment-requests', appointmentRequest);
        res.status(202).json({ message: 'Appointment request received and is being processed' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to process appointment request', error: err.message });
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
