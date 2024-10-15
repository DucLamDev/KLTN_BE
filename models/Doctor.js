import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import scheduleSchema from './Schedule.js';

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  // doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
})

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `BS-${randomString}`;
}
const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String},
    specialization: { type: String,  required: true},
    role: {type: String, required: true},
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    phone: {
      type: String,
      // required: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please use a valid phone number.'],
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: [scheduleSchema],
    isOnline: { type: Boolean, default: false },
    roomNumber: { type: String, default: "000" },
    appointmentList: [appointmentSchema] // list cách cuộc hẹn mà bác sĩ đã làm trong ngày
  },
  { timestamps: true }
);

doctorSchema.index({ email: 1 }, { unique: true });

doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

doctorSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingPatient = await mongoose.models.Patient.findOne({ _id: uniqueId });
      isUnique = !existingPatient; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
