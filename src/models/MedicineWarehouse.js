import mongoose from 'mongoose';

//DDang fix
const MedicineWarehouseSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    warehouseName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    medications: [
        {
            medication: { type: String, ref: 'Medication' },
            quantity: { type: Number, required: true },
            expirationDate: { type: Date, required: true }
        }
    ]
});

const MedicineWarehouse = mongoose.model('MedicineWarehouse', MedicineWarehouseSchema);

export default MedicineWarehouse;