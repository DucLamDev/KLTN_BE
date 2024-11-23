import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `HD-${randomString}`;
}

// Schema cho các dịch vụ khám
const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true }, // Tên dịch vụ (ví dụ: "Khám tổng quát", "Xét nghiệm máu")
  cost: { type: Number, required: true }, // Chi phí dịch vụ
});

// Schema cho hóa đơn
const invoiceSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false }, // ID hóa đơn
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    cashierId: {
      type: String,
      ref: "Cashier",
      required: true,
    },
    issueDate: { type: Date, default: Date.now }, // Ngày xuất hóa đơn
    services: [serviceSchema], // Danh sách các dịch vụ khám
    totalAmount: { type: Number, required: true }, // Tổng số tiền thanh toán
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Bank Transfer", "Insurance"],
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Cancelled"],
      default: "Pending",
    },
    notes: { type: String }, // Ghi chú hóa đơn
  },
  { timestamps: true }
);

// Middleware để tạo ID hóa đơn trước khi lưu
invoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingInvoice = await mongoose.models.Invoice.findOne({ _id: uniqueId });
      isUnique = !existingInvoice; // Kiểm tra xem ID đã tồn tại hay chưa
    }

    this._id = uniqueId; // Gán ID duy nhất
  }

  // Tính tổng số tiền từ danh sách dịch vụ
  if (this.services && this.services.length > 0) {
    this.totalAmount = this.services.reduce(
      (total, service) => total + service.cost * service.quantity,
      0
    );
  }

  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
