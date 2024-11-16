import mongoose from "mongoose";
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TH-${randomString}`;
}
const medicationSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  medicationName: { type: String, required: true },
  quantity: { type: Number },
  dosage: { type: String, required: true },
  price: { type: Number, required: true },
  instructions: { type: String },
  expirationDate: { type: Date },
});

medicationSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingMedication = await mongoose.models.Medication.findOne({
        _id: uniqueId,
      });
      isUnique = !existingMedication;
    }
    this._id = uniqueId;
  }
  next();
});
const Medication = mongoose.model("Medication", medicationSchema);
export default Medication;
