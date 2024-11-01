import mongoose from 'mongoose';


const TestSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    patientId: { type: String, ref: 'Patient', required: true },
    labTestId: { type: String, ref: 'LabTest', required: true },
    result: { type: String, required: true },
    datePerformed: { type: Date, default: Date.now },
    technicianId: { type: String, ref: 'LaboratoryTechnician' },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
});

module.exports = mongoose.model('Test', TestSchema);
