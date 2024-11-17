import mongoose from "mongoose";

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TE-${randomString}`;
}
const testTypeSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  testName: { type: String },
  price: { type: Number },
  description: { type: String },
});
const TestSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  patientId: { type: String, required: true },
  labTestId: { type: String, required: true },
  technicianId: { type: String, required: true },
  result: { type: String, required: true },
  reasonByDoctor: { type: String },
  datePerformed: { type: Date, default: Date.now },
  requestPerformed: { type: Date, default: Date.now },
  testsPerformed: [testTypeSchema],
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
