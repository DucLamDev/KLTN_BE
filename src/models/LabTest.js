import mongoose from 'mongoose';

const LabTestSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    technician: { type: String, ref: 'LaboratoryTechnician', required: true },
    samplesRequired: [{ type: String }],
    normalRange: { type: String }
});

const LabTest = mongoose.model('LabTest', LabTestSchema);
export default LabTest;