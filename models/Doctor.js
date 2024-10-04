import mongoose from 'mongoose';
const scheduleSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).'],
  },
  endTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).'],
  },
});

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String },
  numPatients: Number,
})
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  // doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
})
const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number.'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    schedule: [scheduleSchema],
    isOnline: { type: Boolean, default: false },
    // examRoomId: { type: String },
    roomNumber: { type: String },
    appointmentList: [appointmentSchema] // list cách cuộc hẹn mà bác sĩ đã làm trong ngày
  },
  { timestamps: true }
);

doctorSchema.index({ email: 1 }, { unique: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
