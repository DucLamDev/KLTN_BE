import mongoose from 'mongoose';


const DepartmentSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    name: { type: String, required: true },
    description: { type: String },
    head: { type: String, ref: 'Doctor' },
    staff: [{ type: String, ref: 'Doctor' }],
    clinic: { type: String, ref: 'Clinic', required: true }
});

module.exports = mongoose.model('Department', DepartmentSchema);
