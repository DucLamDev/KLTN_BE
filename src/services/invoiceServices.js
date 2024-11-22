import {
    createInvoice,
    getListInvoices,
    getOneInvoiceById,
    updateInvoiceById,
    deleteInvoiceById,
  } from "../repositories/invoiceRepository.js";
  import { updateAppointmentById } from "../repositories/appointmentRepository.js";
  import { findCashier } from "../repositories/cashierRepository.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import ServiceList from "../models/ServiceList.js";
import Cashier from "../models/Cashier.js";
  
  // Tạo hóa đơn
  export const createNewInvoice = async (patientId, doctorId, cashierId) => {
    try {
      const doctor = await Doctor.findById(doctorId);
      const patient = await Patient.findById(patientId);
      const cashier = await Cashier.findById(cashierId);
  
      if (!doctor || !patient || !cashier) {
        throw new Error("Doctor or patient and cashier not found.");
      }
  
      // Lấy danh sách dịch vụ từ bác sĩ
      const serviceList = await ServiceList.findOne({ doctorId, patientId });
  
      if (!serviceList) {
        throw new Error("Service list not found.");
      }
  
      // Tính tổng số tiền từ danh sách dịch vụ
      const totalAmount = serviceList.services.reduce(
        (total, service) => total + service.cost,
        0
      );
  
      // Tạo hóa đơn mới
      const newInvoice = new Invoice({
        doctorId: doctor._id,
        patientId: patient._id,
        cashierId: cashier._id,
        services: serviceList.services,
        totalAmount,
        paymentStatus: "Pending",
        invoiceDate: new Date(),
      });
  
      // Lưu hóa đơn
      await newInvoice.save();
  
      // Cập nhật trạng thái cuộc hẹn
      await updateAppointmentById(serviceList.appointmentId, { status: "Completed" });
  
      return { message: "Invoice created successfully.", invoice: newInvoice };
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw new Error("Internal server error.");
    }
  };
  
  // Lấy danh sách hóa đơn
  export const getInvoices = async () => {
    return await getListInvoices();
  };
  
  // Lấy hóa đơn theo ID
  export const getInvoiceById = async (id) => {
    const invoice = await getOneInvoiceById(id);
    if (!invoice) throw new Error("Invoice not found.");
    return invoice;
  };
  
  // Cập nhật trạng thái thanh toán của hóa đơn
  export const updateInvoiceStatus = async (invoiceId, paymentStatus) => {
    if (!["Pending", "Paid", "Canceled"].includes(paymentStatus)) {
      throw new Error("Invalid payment status.");
    }
  
    const updatedInvoice = await updateInvoiceById(invoiceId, { paymentStatus });
    if (!updatedInvoice) {
      throw new Error("Invoice not found.");
    }
  
    return {
      message: "Invoice status updated successfully.",
      invoice: updatedInvoice,
    };
  };
  
  // Xóa hóa đơn theo ID
  export const deleteInvoice = async (id) => {
    const deletedInvoice = await deleteInvoiceById(id);
    if (!deletedInvoice) {
      throw new Error("Invoice not found.");
    }
    return deletedInvoice;
  };
  