import mongoose from 'mongoose';

const shiftScheduleSchema = new mongoose.Schema({
    dayOfWeek: String,
    startTime: String,
    endTime: String,
});

// const appointmentSchema = new mongoose.Schema({
//     appointmentId: mongoose.Schema.Types.ObjectId,
//     patientId: mongoose.Schema.Types.ObjectId,
//     appointmentDate: Date,
//     reason: String,
//     doctorId: mongoose.Schema.Types.ObjectId,
// });

const receptionistSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: String,
    email: String,
    shiftSchedule: [shiftScheduleSchema],
    // appointmentsManaged: [appointmentSchema],
});

// module.exports = mongoose.model('Receptionist', receptionistSchema);

const Receptionist = mongoose.model('Receptionist', receptionistSchema);
export default Receptionist;