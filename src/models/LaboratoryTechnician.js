import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import scheduleSchema from "../models/Schedule.js"; // Đảm bảo đường dẫn là chính xác


function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `YTXN-${randomString}`;
}

const laboratoryTechnicianSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false },
    fullName: { type: String },
    address: { type: String },
    specialization: { type: String },
    dateOfBirth: { type: Date },
    numberId: { type: String },
    labTest: { type: String, ref: "LabTest" },
    role: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."],
    },
    email: {
      type: String,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: [scheduleSchema], // Sử dụng đúng cách schema cho lịch trình
    isOnline: { type: Boolean, default: false },
    labTestNumber: { type: String, default: "XN-000" },
  },
  { timestamps: true }
);

laboratoryTechnicianSchema.index({ email: 1 }, { unique: true });

laboratoryTechnicianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

laboratoryTechnicianSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor =
        await mongoose.models.LaboratoryTechnicianSchema.findOne({
          _id: uniqueId,
        });
      isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
laboratoryTechnicianSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const LaboratoryTechnician = mongoose.model(
  "LaboratoryTechnician",
  laboratoryTechnicianSchema
);
export default LaboratoryTechnician;
