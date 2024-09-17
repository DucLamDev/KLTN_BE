import express from 'express';
import Receptionist from '../models/Receptionist.js';
const router = express.Router();

// Tạo nhân viên lễ tân mới
router.post('/', async (req, res) => {
    try {
        const receptionist = new Receptionist(req.body);
        await receptionist.save();
        res.status(201).send(receptionist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách nhân viên lễ tân
router.get('/', async (req, res) => {
    try {
        const receptionists = await Receptionist.find();
        res.status(200).send(receptionists);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một nhân viên lễ tân
router.get('/:id', async (req, res) => {
    try {
        const receptionist = await Receptionist.findById(req.params.id);
        if (!receptionist) return res.status(404).send();
        res.status(200).send(receptionist);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin nhân viên lễ tân
router.patch('/:id', async (req, res) => {
    try {
        const receptionist = await Receptionist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!receptionist) return res.status(404).send();
        res.status(200).send(receptionist);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa nhân viên lễ tân
router.delete('/:id', async (req, res) => {
    try {
        const receptionist = await Receptionist.findByIdAndDelete(req.params.id);
        if (!receptionist) return res.status(404).send();
        res.status(200).send(receptionist);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
