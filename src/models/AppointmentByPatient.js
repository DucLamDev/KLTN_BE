// models/Appointment.js
import mongoose from "mongoose";

const appointmentByPatientSchema = new mongoose.Schema(
  {
    id: { type: String, auto: false },
    fullName: { type: String },
    appointmentDateByPatient: { type: Date },
    doctorId: {
      type: String,
      ref: "Doctor",
    },
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    reason: { type: String },
    specialization: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
    reExamination: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AppointmentByPatient = mongoose.model(
  "AppointmentByPatient",
  appointmentByPatientSchema
);
export default AppointmentByPatient;
