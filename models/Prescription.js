import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  medicationName: String,
  dose: String,
  quantity: Number,
  instructions: String,
});

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  medications: [medicationSchema],
  dateIssued: { type: Date, default: Date.now },
});

// module.exports = mongoose.model('Prescription', prescriptionSchema);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
