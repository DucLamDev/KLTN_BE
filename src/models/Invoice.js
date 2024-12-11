import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `HD-${randomString}`;
}

const invoiceSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false },
    issueDate: { type: Date, default: Date.now },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Bank Transfer", "Insurance"],
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Cancelled"],
      default: "Pending",
    },
    type: { type: String },
    image: { type: String },
    staffId: { type: String },
    staffRole: { type: String },
    patientId: {
      type: String,
    },
    doctorId: {
      type: String,
    },
    receptionistId: {
      type: String,
    },
  },
  { timestamps: true }
);

// Middleware để tạo ID hóa đơn trước khi lưu
invoiceSchema.pre("save", async function(next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingInvoice = await mongoose.models.Invoice.findOne({
        _id: uniqueId,
      });
      isUnique = !existingInvoice;
    }

    this._id = uniqueId;
  }
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
