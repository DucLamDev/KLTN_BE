const mongoose = require('mongoose');

const LabTestSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'LaboratoryTechnician', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    samplesRequired: [{ type: String }],
    normalRange: { type: String }
});

module.exports = mongoose.model('LabTest', LabTestSchema);
