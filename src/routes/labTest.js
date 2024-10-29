
import express from 'express';
import LabTest from '../models/LabTest.js';
const router = express.Router();
// Tạo xét nghiệm mới
router.post('/', async (req, res) => {
    try {
        const labTest = new LabTest(req.body);
        await labTest.save();
        res.status(201).send(labTest);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách xét nghiệm
router.get('/', async (req, res) => {
    try {
        const labTests = await LabTest.find().populate('patientId').populate('doctorId');
        res.status(200).send(labTests);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một xét nghiệm
router.get('/:id', async (req, res) => {
    try {
        const labTest = await LabTest.findById(req.params.id).populate('patientId').populate('doctorId');
        if (!labTest) return res.status(404).send();
        res.status(200).send(labTest);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin xét nghiệm
router.patch('/:id', async (req, res) => {
    try {
        const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!labTest) return res.status(404).send();
        res.status(200).send(labTest);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa xét nghiệm
router.delete('/:id', async (req, res) => {
    try {
        const labTest = await LabTest.findByIdAndDelete(req.params.id);
        if (!labTest) return res.status(404).send();
        res.status(200).send(labTest);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
