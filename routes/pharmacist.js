
import express from 'express';
import Pharmacist from '../models/Pharmacist.js';
const router = express.Router();
// Tạo dược sĩ mới
router.post('/', async (req, res) => {
    try {
        const pharmacist = new Pharmacist(req.body);
        await pharmacist.save();
        res.status(201).send(pharmacist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách dược sĩ
router.get('/', async (req, res) => {
    try {
        const pharmacists = await Pharmacist.find();
        res.status(200).send(pharmacists);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một dược sĩ
router.get('/:id', async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findById(req.params.id);
        if (!pharmacist) return res.status(404).send();
        res.status(200).send(pharmacist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin dược sĩ
router.patch('/:id', async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pharmacist) return res.status(404).send();
        res.status(200).send(pharmacist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa dược sĩ
router.delete('/:id', async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findByIdAndDelete(req.params.id);
        if (!pharmacist) return res.status(404).send();
        res.status(200).send(pharmacist);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
