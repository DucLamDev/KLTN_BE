import mongoose from "mongoose";

const MedicineWarehouseSchema = new mongoose.Schema({
  _id: { type: String, auto: false },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  medications: [{ type: String, ref: "Medication" }],
});
const MedicineWarehouse = mongoose.model(
  "MedicineWarehouse",
  MedicineWarehouseSchema
);
export default MedicineWarehouse;
