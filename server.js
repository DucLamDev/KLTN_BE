import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import pharmacistRoutes from './routes/pharmacist.js';
import labTestRoutes from './routes/labTest.js';
import receptionistRoutes from './routes/receptionist.js';
import appointmentRoutes from './routes/appointment.js';
import prescriptionRoutes from './routes/prescription.js';
import invoiceRoutes from './routes/invoice.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://DucLam:kr7i8EBTmZqwuiRX@clinic-management.hmcis.mongodb.net/?retryWrites=true&w=majority&appName=clinic-management", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/pharmacists', pharmacistRoutes);
app.use('/labTests', labTestRoutes);
app.use('/receptionists', receptionistRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/invoices', invoiceRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
