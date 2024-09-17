import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
    medicationName: String,
    dose: String,
    quantity: Number,
});

const prescriptionSchema = new mongoose.Schema({
    prescriptionId: mongoose.Schema.Types.ObjectId,
    medications: [medicationSchema],
});

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receptionistId: mongoose.Schema.Types.ObjectId,
    appointmentDate: { type: Date, required: true },
    reason: String,
    status: { type: String, default: "Scheduled" },
    prescription: prescriptionSchema,
});

// module.exports = mongoose.model('Appointment', appointmentSchema);


const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;