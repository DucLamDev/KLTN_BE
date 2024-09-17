import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema({
  disease: String,
  diagnosisDate: Date,
  treatment: String,
});

const appointmentSchema = new mongoose.Schema({
  appointmentId: mongoose.Schema.Types.ObjectId,
  doctorId: mongoose.Schema.Types.ObjectId,
  appointmentDate: Date,
  reason: String,
});

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: Date,
  gender: String,
  address: String,
  phone: String,
  email: String,
  medicalHistory: [medicalHistorySchema],
  appointments: [appointmentSchema],
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;