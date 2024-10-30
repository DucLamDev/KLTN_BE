import Invoice from '../models/Invoice.js';

export const createInvoice = async (invoiceData) => {
  const invoice = new Invoice(invoiceData);
  return await invoice.save();
};

export const getListInvoices = async () => {
  return await Invoice.find()
};

export const getOneInvoiceById = async (id) => {
  return await Invoice.findById(id)    
};

export const updateInvoiceById = async (id, updateData) => {
  return await Invoice.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteInvoiceById = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};
