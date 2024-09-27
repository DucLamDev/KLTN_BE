import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  treatment: { type: String, required: true },
});

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    numberId: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    address: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    medicalHistory: [medicalHistorySchema],
  },
  { timestamps: true }
);

patientSchema.index({ email: 1 }, { unique: true });
patientSchema.index({ phone: 1 });

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
