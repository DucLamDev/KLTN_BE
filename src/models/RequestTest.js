import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `RT-${randomString}`;
}
const testTypeSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  testName: { type: String },
  price: { type: Number },
  description: { type: String },
});
const requestTestSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  testTypes: [testTypeSchema],
  patientId: {
    type: String,
    ref: "Patient",
    required: true,
  },
  doctorId: { type: String, required: true },
  requestDate: { type: Date, default: Date.now() },
  reason: { type: String },
  isTestInvoiceCreated: { type: Boolean, default: false },
});

requestTestSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await mongoose.models.RequestTest.findOne({
        _id: uniqueId,
      });
      isUnique = !existingDoctor;
    }
    this._id = uniqueId;
  }
  next();
});
const RequestTest = mongoose.model("RequestTest", requestTestSchema);

export default RequestTest;
