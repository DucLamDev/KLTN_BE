import Invoice from "../models/Invoice.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import ServiceList from "../models/ServiceList.js";

// Tạo hóa đơn mới
export const createInvoice = async (invoiceData) => {
  const invoice = new Invoice(invoiceData);
  return await invoice.save();
};

// Lấy danh sách hóa đơn
export const getListInvoices = async () => {
  return await Invoice.find().populate("patientId doctorId");
};

// Lấy hóa đơn theo ID
export const getOneInvoiceById = async (id) => {
  return await Invoice.findById(id).populate("patientId doctorId");
};

// Cập nhật hóa đơn theo ID
export const updateInvoiceById = async (id, updateData) => {
  return await Invoice.findByIdAndUpdate(id, updateData, { new: true });
};

// Xóa hóa đơn theo ID
export const deleteInvoiceById = async (id) => {
  return await Invoice.findByIdAndDelete(id);
};
