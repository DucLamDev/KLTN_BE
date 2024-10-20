// models/Appointment.js
import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  treatment: { type: String, required: true },
});

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `CHBN-${randomString}`;
}
const appointmentByPatientSchema = new mongoose.Schema(
  {
    id: {type: String, auto: false},
    fullName: {type: String},
    appointmentDateByPatient: { type: Date},
    specialization: {type: String},
    dateOfBirth: { type: Date},
    gender: {type: String},  
    email: {type: String},
    address:{type: String},
    phone: {type: String},
    medicalHistory: [medicalHistorySchema],

  },
  { timestamps: true }
);

appointmentByPatientSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await mongoose.models.AppointmentByPatient.findOne({ _id: uniqueId });
      isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

const AppointmentByPatient = mongoose.model(
  "AppointmentByPatient",
  appointmentByPatientSchema
);
export default AppointmentByPatient;


// // models/Appointment.js
// import mongoose from "mongoose";

// const appointmentSchema = new mongoose.Schema(
//   {
//     patientId: {
//       type: String,
//       ref: "Patient",
//       required: true,
//     },
//     doctorId: {
//       type: String,
//       ref: "Doctor",
//     },
//     appointmentDate: { type: Date, required: true },
//     reason: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["Scheduled", "Completed", "Cancelled"],
//       default: "Scheduled",
//     },
//     priority: {type: Boolean, default: false}
//   },
//   { timestamps: true }
// );

// const Appointment = mongoose.model("Appointment", appointmentSchema);
// export default Appointment;
