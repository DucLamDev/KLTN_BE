import Cashier from "../models/Cashier.js";
import Doctor from "../models/Doctor.js";
import Invoice from "../models/Invoice.js";
import Patient from "../models/Patient.js";
import ServiceList from "../models/ServiceList.js";
import {
  createCashier,
  getListCashiers,
  getOneCashierById,
  updateCashierById,
  deleteCashierById,
  findCashier,
} from "../repositories/cashierRepository.js";
export const createInvoice = async (patientId, doctorId, cashierId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    const cashier = await Cashier.findById(cashierId);

    if (!doctor || !patient || !cashier) {
      throw new Error("Doctor or patient not found.");
    }

    // Lấy danh sách dịch vụ mà bác sĩ đã tạo cho bệnh nhân
    const serviceList = await ServiceList.findOne({ doctorId, patientId });

    if (!serviceList) {
      throw new Error("Service list not found.");
    }

    // Tính tổng số tiền từ danh sách dịch vụ
    const totalAmount = serviceList.services.reduce(
      (total, service) => total + service.cost,
      0
    );

    // Tạo hóa đơn mới dựa trên danh sách dịch vụ
    const newInvoice = new Invoice({
      doctorId: doctor._id,
      patientId: patient._id,
      cashierId: cashier._id,
      services: serviceList.services,
      totalAmount,
      status: "Pending", // Hóa đơn ban đầu có trạng thái 'Pending'
      invoiceDate: new Date(),
    });

    // Lưu hóa đơn vào cơ sở dữ liệu
    await newInvoice.save();

    return { message: "Invoice created successfully.", invoice: newInvoice };
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Internal server error.");
  }
};

export const getCashierByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await findCashier(query);
};
// Cập nhật trạng thái thanh toán của hóa đơn
export const updateInvoiceStatus = async (invoiceId, paymentStatus) => {
  try {
    // Kiểm tra trạng thái thanh toán có hợp lệ không
    if (!["Pending", "Paid", "Canceled"].includes(paymentStatus)) {
      throw new Error("Invalid payment status.");
    }

    // Tìm hóa đơn theo ID và cập nhật trạng thái thanh toán
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedInvoice) {
      throw new Error("Invoice not found.");
    }

    return {
      message: "Invoice status updated successfully.",
      invoice: updatedInvoice,
    };
  } catch (error) {
    console.error("Error updating invoice status:", error);
    throw new Error("Internal server error.");
  }
};

export const createCashierService = async (cashierData) => {
  try {
    return await createCashier(cashierData);
  } catch (error) {
    throw new Error("Error creating cashier: " + error.message);
  }
};

export const getListCashiersService = async () => {
  try {
    return await getListCashiers();
  } catch (error) {
    throw new Error("Error fetching cashier list: " + error.message);
  }
};
export const getOneCashierByIdService = async (id) => {
  try {
    const cashier = await getOneCashierById(id);
    if (!cashier) {
      throw new Error("Cashier not found");
    }
    return cashier;
  } catch (error) {
    throw new Error("Error fetching cashier: " + error.message);
  }
};

export const updateCashierByIdService = async (id, updateData) => {
  try {
    const updatedCashier = await updateCashierById(id, updateData);
    if (!updatedCashier) {
      throw new Error("Cashier not found");
    }
    return updatedCashier;
  } catch (error) {
    throw new Error("Error updating cashier: " + error.message);
  }
};

export const deleteCashierByIdService = async (id) => {
  try {
    const deletedCashier = await deleteCashierById(id);
    if (!deletedCashier) {
      throw new Error("Cashier not found");
    }
    return deletedCashier;
  } catch (error) {
    throw new Error("Error deleting cashier: " + error.message);
  }
};
