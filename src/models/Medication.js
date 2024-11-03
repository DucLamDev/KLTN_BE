import mongoose from 'mongoose';


const MedicationSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    medicationName: { type: String, required: true },
    quantity: {type: Number},
    dosage: { type: String, required: true },
    price: { type: Number, required: true },
    instructions: {type: String},
    expirationDate: {type: Date},

});

const Medication = mongoose.model('Medication', MedicationSchema);

export default Medication;