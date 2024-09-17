
import express from 'express';
import Invoice from '../models/Invoice.js';
const router = express.Router();
// Tạo hóa đơn mới
router.post('/', async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lấy danh sách hóa đơn
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('patientId').populate('doctorId');
        res.status(200).send(invoices);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lấy chi tiết một hóa đơn
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('patientId').populate('doctorId');
        if (!invoice) return res.status(404).send();
        res.status(200).send(invoice);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cập nhật thông tin hóa đơn
router.patch('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!invoice) return res.status(404).send();
        res.status(200).send(invoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Xóa hóa đơn
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) return res.status(404).send();
        res.status(200).send(invoice);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
