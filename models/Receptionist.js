import mongoose from 'mongoose';

const shiftScheduleSchema = new mongoose.Schema({
    dayOfWeek: String,
    startTime: String,
    endTime: String,
});

const receptionistSchema = new mongoose.Schema({
    fullName: { type: String},
    phone: String,
    email: String,
    password: String,
    shiftSchedule: [shiftScheduleSchema],
});

const Receptionist = mongoose.model('Receptionist', receptionistSchema);
export default Receptionist;
