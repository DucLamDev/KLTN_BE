import { createNewInvoice, getInvoices, getInvoiceById, updateInvoiceStatus, deleteInvoice } from "../services/invoiceServices.js";

// POST: Tạo hóa đơn cho bệnh nhân
export const createInvoiceController = async (req, res) => {
  const { patientId, doctorId } = req.body;
  try {
    const result = await createNewInvoice(patientId, doctorId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Lấy danh sách hóa đơn
export const getInvoicesController = async (req, res) => {
  try {
    const invoices = await getInvoices();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET: Lấy hóa đơn theo ID
export const getInvoiceByIdController = async (req, res) => {
  try {
    const invoice = await getInvoiceById(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// PATCH: Cập nhật trạng thái thanh toán của hóa đơn
export const updateInvoiceStatusController = async (req, res) => {
  const { invoiceId, paymentStatus } = req.body;
  try {
    const result = await updateInvoiceStatus(invoiceId, paymentStatus);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE: Xóa hóa đơn theo ID
export const deleteInvoiceController = async (req, res) => {
  try {
    await deleteInvoice(req.params.id);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
