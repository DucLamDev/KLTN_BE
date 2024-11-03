import mongoose from 'mongoose';



function generateUniqueId() {
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
    return `T-${randomString}`;
  }
const TestSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    patientId: { type: String, ref: 'Patient', required: true },
    labTestId: { type: String, ref: 'LabTest', required: true },
    result: { type: String, required: true },
    datePerformed: { type: Date, default: Date.now },
    technicianId: { type: String, ref: 'LaboratoryTechnician' },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
});


TestSchema.pre('save', async function (next) {
    if (this.isNew) {
      let uniqueId;
      let isUnique = false;
  
      // Kiểm tra tính duy nhất của ID
      while (!isUnique) {
        uniqueId = generateUniqueId();
        const existingDoctor = await mongoose.models.Test.findOne({ _id: uniqueId });
        isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
      }
  
      this._id = uniqueId; // Gán ID duy nhất
    }
    next();
  });
const Test = mongoose.model('Test', TestSchema);

export default Test;