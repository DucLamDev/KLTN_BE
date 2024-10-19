import mongoose from 'mongoose';
import scheduleSchema from './Schedule.js';
import bcrypt from 'bcryptjs';

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `TN-${randomString}`;
}
const cashierSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  fullName: { type: String},
  role: {type: String, required: true},
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
  
},
{ timestamps: true }
);

cashierSchema.index({ email: 1 }, { unique: true });

cashierSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

cashierSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingCashier = await mongoose.models.Cashier.findOne({ _id: uniqueId });
      isUnique = !existingCashier; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
cashierSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const Cashier = mongoose.model('Cashier', cashierSchema);
export default Cashier;