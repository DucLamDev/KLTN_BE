
import mongoose from 'mongoose';

function generateUniqueId() {
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
    return `CD-${randomString}`;
  }
const DiagnosisSchema = new mongoose.Schema({
    diagnosisId: { type: String, auto: false },
    patientId: { type: String, ref: 'Patient'},
    doctorId: { type: String, ref: 'Doctor'},
    disease: { type: String, required: true },
    diagnosisDate: { type: Date, required: true },
    treatment: { type: String, required: true },
});

DiagnosisSchema.pre('save', async function (next) {
    if (this.isNew) {
      let uniqueId;
      let isUnique = false;
  
      while (!isUnique) {
        uniqueId = generateUniqueId();
        const existingDiagnosis = await mongoose.models.Diagnosis.findOne({ _id: uniqueId });
        isUnique = !existingDiagnosis;
      }
  
      this._id = uniqueId;
    }
    next();
  });
const Diagnosis= mongoose.model('Diagnosis', DiagnosisSchema);

export default Diagnosis;