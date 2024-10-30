// invoiceRouter.js
import express from 'express';
import {
    createInvoice,
    listInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} from '../services/invoiceServices.js';

const router = express.Router();

// Tạo hóa đơn mới
router.post('/', async (req, res) => {
    try {
        const invoice = await createInvoice(req.body);
        res.status(200).send(invoice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Lấy danh sách hóa đơn
router.get('/', async (req, res) => {
    try {
        const invoices = await listInvoices();
        res.status(200).send(invoices);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Lấy chi tiết một hóa đơn
router.get('/:id', async (req, res) => {
    try {
        const invoice = await getInvoiceById(req.params.id);
        res.status(200).send(invoice);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

// Cập nhật thông tin hóa đơn
router.patch('/:id', async (req, res) => {
    try {
        const invoice = await updateInvoice(req.params.id, req.body);
        res.status(200).send(invoice);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Xóa hóa đơn
router.delete('/:id', async (req, res) => {
    try {
        const invoice = await deleteInvoice(req.params.id);
        res.status(200).send(invoice);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

export default router;
