import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Schema lịch sử bệnh
const medicalHistorySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  treatment: { type: String, required: true },
});

// Hàm tạo mã ngẫu nhiên
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `BN-${randomString}`;
}

// Schema bệnh nhân
const patientSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false }, // Trường ID theo định dạng BN-X
    fullName: { type: String },
    dateOfBirth: { type: Date },
    numberId: { type: String }, // Căn cước công dân
    accountId: { type: String },
    gender: { type: String },
    address: { type: String },
    password: {
      type: String,
      required: true,
      unique: true,
    },
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
    clerkId: { type: String, required: false },
  },
  { timestamps: true, _id: false } // Tắt tự động tạo ObjectId
);

patientSchema.index({ email: 1 }, { unique: true });
// Middleware để tạo ID trước khi lưu
patientSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingPatient = await mongoose.models.Patient.findOne({
        _id: uniqueId,
      });
      isUnique = !existingPatient; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Phương thức để so sánh mật khẩu
patientSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
