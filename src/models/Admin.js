import mongoose from "mongoose";
import scheduleSchema from "./Schedule.js";
import bcrypt from "bcryptjs";

function generateUniqueId() {

    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
    return `QTV-${randomString}`;
  }
const AdminSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  role: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  schedule: [scheduleSchema],
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
AdminSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAdmin = await mongoose.models.Admin.findOne({
        _id: uniqueId,
      });
      isUnique = !existingAdmin; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
