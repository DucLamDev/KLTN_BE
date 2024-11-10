
import mongoose from 'mongoose';
import testTypeSchema from './TestType.js';


function generateUniqueId() {
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
    return `Test-${randomString}`;
  }
const requestTestSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    testName: {type: String, required: true},
    testType: [testTypeSchema],
    patientId: { type: String, ref: 'Patient', required: true },
    doctorId: { type: String, ref: 'Doctor', required: true },
    requestDate: {type: Date, default: Date.now()},
    reason: {type: String}
});


requestTestSchema.pre('save', async function (next) {
    if (this.isNew) {
      let uniqueId;
      let isUnique = false;
  
      // Kiểm tra tính duy nhất của ID
      while (!isUnique) {
        uniqueId = generateUniqueId();
        const existingDoctor = await mongoose.models.RequestTest.findOne({ _id: uniqueId });
        isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
      }
  
      this._id = uniqueId; // Gán ID duy nhất
    }
    next();
  });
const RequestTest = mongoose.model('RequestTest', requestTestSchema);

export default RequestTest;