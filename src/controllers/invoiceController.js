import {
  getListInvoicesService,
  updateInvoiceService,
  deleteInvoiceService,
  createInvoiceService,
  getInvoiceByIdService,
} from "../services/invoiceServices.js";

export const createInvoiceController = async (req, res) => {
  try {
    const invoice = await createInvoiceService(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getListInvoicesController = async (req, res) => {
  try {
    const invoices = await getListInvoicesService();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInvoiceByIdController = async (req, res) => {
  try {
    const invoice = await getInvoiceByIdService(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateInvoiceController = async (req, res) => {
  try {
    const invoice = await updateInvoiceService(req.params.id, req.body);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteInvoiceController = async (req, res) => {
  try {
    await deleteInvoiceService(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
