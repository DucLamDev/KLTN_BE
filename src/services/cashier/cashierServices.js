// services/invoiceService.js
import Doctor from "../../models/Doctor.js";
import Invoice from "../../models/Invoice.js";
import Patient from "../../models/Patient.js";
import ServiceList from "../../models/ServiceList.js";

export const createInvoice = async (patientId, doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient) {
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
      services: serviceList.services,
      totalAmount,
      paymentStatus: "Pending", // Hóa đơn ban đầu có trạng thái 'Pending'
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
