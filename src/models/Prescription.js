import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TT-${randomString}`;
}
const medicationSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  medicationName: { type: String, required: true },
  quantity: { type: Number },
  quantityRemaining: { type: Number },
  dosage: { type: String, required: true },
  price: { type: Number, required: true },
  instructions: { type: String },
  expirationDate: { type: Date },
});
const prescriptionSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  patientId: { type: String, required: true, ref: "Patient" },
  doctorId: { type: String, required: true, ref: "Doctor" },
  medications: [medicationSchema],
  status: {
    type: String,
    enum: ["Scheduled", "Completed"],
    default: "Scheduled",
  },
  dateIssued: { type: Date, default: Date.now },
  visitorName: { type: String, required: false },
  visitorPhone: { type: String, required: false },
});

prescriptionSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    do {
      uniqueId = generateUniqueId();
      const existingPrescription = await mongoose.models.Prescription.findOne({
        _id: uniqueId,
      });
      isUnique = !existingPrescription;
    } while (!isUnique);

    this._id = uniqueId;
  }
  next();
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
