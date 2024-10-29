import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    status: String,
    details: String,
});

const labTestSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    testDate: Date,
    patientId: mongoose.Schema.Types.ObjectId,
    doctorId: mongoose.Schema.Types.ObjectId,
    laboratoryTechnicianId: mongoose.Schema.Types.ObjectId,
    result: resultSchema,
});

// module.exports = mongoose.model('LabTest', labTestSchema);


const LabTest = mongoose.model('LabTest', labTestSchema);
export default LabTest;