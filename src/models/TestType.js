import mongoose from "mongoose";

const testTypeSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  testName: { type: String },
  price: { type: Number },
  description: { type: String },
});

const TestType = mongoose.model("TestType", testTypeSchema);

export default TestType;
