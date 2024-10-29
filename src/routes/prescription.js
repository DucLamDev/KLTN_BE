import express from 'express';
import Prescription from '../models/Prescription.js';
const router = express.Router();

// Tạo đơn thuốc mới
router.post('/', async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).send(prescription);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách đơn thuốc
router.get('/', async (req, res) => {
    try {
        const prescriptions = await Prescription.find().populate('patientId').populate('doctorId');
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một đơn thuốc
router.get('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('patientId').populate('doctorId');
        if (!prescription) return res.status(404).send();
        res.status(200).send(prescription);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin đơn thuốc
router.patch('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prescription) return res.status(404).send();
        res.status(200).send(prescription);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa đơn thuốc
router.delete('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!prescription) return res.status(404).send();
        res.status(200).send(prescription);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
