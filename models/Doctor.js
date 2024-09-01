import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  dayOfWeek: String,
  startTime: String,
  endTime: String,
});

const appointmentSchema = new mongoose.Schema({
  appointmentId: mongoose.Schema.Types.ObjectId,
  patientId: mongoose.Schema.Types.ObjectId,
  appointmentDate: Date,
  reason: String,
});

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialization: String,
  phone: String,
  email: String,
  schedule: [scheduleSchema],
  appointments: [appointmentSchema],
});  



module.exports = mongoose.model('Doctor', doctorSchema);