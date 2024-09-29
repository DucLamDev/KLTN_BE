import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import patientRoutes from "./routes/patient.js";
import doctorRoutes from "./routes/doctor.js";
import pharmacistRoutes from "./routes/pharmacist.js";
import labTestRoutes from "./routes/labTest.js";
import receptionistRoutes from "./routes/receptionist.js";
import appointmentRoutes from "./routes/appointment.js";
import appointmentByPatientRoutes from "./routes/appointmentByPatient.js";
import prescriptionRoutes from "./routes/prescription.js";
import invoiceRoutes from "./routes/invoice.js";
import kafkaRouter from "./routes/kafkaRoutes.js";
import { connectProducer as connectAppointmentProducer } from "./kafka/producer.js";
import { connectProducer as connectExamRoomProducer } from "./kafka/examRoomProducer.js"; // Kết nối producer cho buồng khám
import { runConsumer } from "./kafka/departmentConsumer.js";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Kết nối đến MongoDB
mongoose
  .connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));
const corsOptions = {
  origin: "http://localhost:3001", // Allow requests from your client
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/pharmacists", pharmacistRoutes);
app.use("/labTests", labTestRoutes);
app.use("/receptionists", receptionistRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/appointmentByPatient", appointmentByPatientRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/kafka", kafkaRouter);
// Hàm khởi động ứng dụng

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  // await startApp();
});
const startApp = async () => {
  await connectAppointmentProducer(); // Kết nối producer cho lịch hẹn
  await connectExamRoomProducer(); // Kết nối producer cho buồng khám
  await runConsumer(); // Chạy consumer
};
