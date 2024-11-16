import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `HDT-${randomString}`;
}

const PrescriptionInvoiceSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  patientId: { type: String, ref: "Patient", required: true },
  doctorId: { type: String, ref: "Doctor", required: true },
  pharmacistId: { type: String, ref: "Pharmacist", required: true },
  prescriptionId: { type: String, ref: "Prescription", required: true },
  medications: [{ type: String, ref: "Medication" }],
  totalAmount: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
});

PrescriptionInvoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingPrescriptionBill =
        await mongoose.models.PrescriptionBill.findOne({ _id: uniqueId });
      isUnique = !existingPrescriptionBill; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

const PrescriptionBill = mongoose.model(
  "prescriptionBill",
  PrescriptionInvoiceSchema
);
export default PrescriptionBill;
