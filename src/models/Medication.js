import mongoose from 'mongoose';


const MedicationSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    sideEffects: [{ type: String }],
    contraindications: [{ type: String }],
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const Medication = mongoose.model('Medication', MedicationSchema);

export default Medication;