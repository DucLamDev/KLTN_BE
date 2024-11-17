import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TE-${randomString}`;
}
const testResult = new mongoose.Schema({
  testName: { type: String },
  testResult: { type: String },
  price: { type: Number },
  referenceRange: { type: String },
  measurementUnit: { type: String },
  equipment: { type: String },
});

const TestSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  patientId: { type: String, required: true },
  labTestId: { type: String, required: true },
  doctorId: { type: String, required: true },
  technicianId: { type: String, required: true },
  results: [testResult],
  reasonByDoctor: { type: String },
  diagnosticTest: { type: String },
  datePerformed: { type: Date, default: Date.now },
  dateRequested: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

TestSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await mongoose.models.Test.findOne({
        _id: uniqueId,
      });
      isUnique = !existingDoctor;
    }

    this._id = uniqueId;
  }
  next();
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
