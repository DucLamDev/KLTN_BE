// models/Appointment.js
import mongoose from "mongoose";

const appointmentByPatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointmentDate: { type: Date, required: true },
    specialization: { type: String, required: true },
  },
  { timestamps: true }
);

const AppointmentByPatient = mongoose.model(
  "AppointmentByPatient",
  appointmentByPatientSchema
);
export default AppointmentByPatient;
