import mongoose from 'mongoose';


const prescriptionSchema = new mongoose.Schema({
  prescriptionId: mongoose.Schema.Types.ObjectId,
  patientId: mongoose.Schema.Types.ObjectId,
  medications: [
      {
          medicationName: String,
          dose: String,
          quantity: Number
      }
  ],
  dateDispensed: Date,
});

const shiftScheduleSchema = new mongoose.Schema({
  dayOfWeek: String,
  startTime: String,
  endTime: String,
});

const pharmacistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: String,
  email: String,
  shiftSchedule: [shiftScheduleSchema],
  prescriptionsHandled: [prescriptionSchema],
});

// module.exports = mongoose.model('Pharmacist', pharmacistSchema);


const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
export default Pharmacist;