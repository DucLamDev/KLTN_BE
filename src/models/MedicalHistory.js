import mongoose from "mongoose";
// Schema lịch sử bệnh
const medicalHistorySchema = new mongoose.Schema({
  disease: { type: String, required: true },
  diagnosisDate: { type: Date, required: true },
  treatment: { type: String, required: true },
});

export default medicalHistorySchema; 