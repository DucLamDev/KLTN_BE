// models/Appointment.js
import mongoose from "mongoose";


function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `CH-${randomString}`;
}
const appointmentSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false },
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: String,
      ref: "Doctor",
    },
    appointmentDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    specialization: { type: String, required: true},
    priority: {type: Boolean, default: false}
  },
  { timestamps: true }
);

appointmentSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAppointment = await mongoose.models.Appointment.findOne({ _id: uniqueId });
      isUnique = !existingAppointment; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
