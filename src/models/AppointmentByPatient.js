// models/Appointment.js
import mongoose from "mongoose";
import medicalHistorySchema from "./MedicalHistory.js";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `CH-Online-${randomString}`;
}
const appointmentByPatientSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false },
    fullName: { type: String },
    appointmentDateByPatient: { type: Date },
    doctorId: {
      type: String,
      ref: "Doctor",
    },
    patientId: {
      type: String,
      ref: "Patient",
    },
    reason: {type: String},
    specialization: {type: String},
    dateOfBirth: { type: Date},
    gender: {type: String},  
    email: {type: String},
    address:{type: String},
    phone: {type: String},
    medicalHistory: [medicalHistorySchema],
    reExamination: {type: Boolean, default: false}
  },
  { timestamps: true }
);

appointmentByPatientSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAppointment = await mongoose.models.AppointmentByPatient.findOne({ _id: uniqueId });
      isUnique = !existingAppointment; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

const AppointmentByPatient = mongoose.model(
  "AppointmentByPatient",
  appointmentByPatientSchema
);
export default AppointmentByPatient;
