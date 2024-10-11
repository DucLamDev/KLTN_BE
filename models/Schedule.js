// models/Appointment.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  startTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).'],
  },
  endTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).'],
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
