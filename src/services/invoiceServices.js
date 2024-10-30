// invoiceService.js
import Invoice from "../models/Invoice.js";

// Create a new invoice
export const createInvoice = async (invoiceData) => {
    const invoice = new Invoice(invoiceData);
    await invoice.save();
    return invoice;
};

// List all invoices
export const listInvoices = async () => {
    return await Invoice.find()
        .populate("patient")
        .populate("doctor")
        .populate("cashier");
};

// Get details of a specific invoice
export const getInvoiceById = async (id) => {
    const invoice = await Invoice.findById(id)
        .populate("patient")
        .populate("doctor")
        .populate("cashier");
    if (!invoice) throw new Error("Invoice not found");
    return invoice;
};

// Update an invoice
export const updateInvoice = async (id, updateData) => {
    const invoice = await Invoice.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!invoice) throw new Error("Invoice not found");
    return invoice;
};

// Delete an invoice
export const deleteInvoice = async (id) => {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) throw new Error("Invoice not found");
    return invoice;
};
