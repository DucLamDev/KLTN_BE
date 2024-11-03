import mongoose from 'mongoose';


const ClinicSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    departments: { type: String, ref: 'Department' },
    doctors: [{ type: String, ref: 'Doctor' }],
    pharmacists: [{ type: String, ref: 'Pharmacist' }],
});

const Clinic = mongoose.model('Clinic', ClinicSchema);

export default Clinic;