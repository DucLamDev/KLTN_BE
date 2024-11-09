import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import patientRoutes from "./routes/patient.js";
import routerDoctor from "./routes/doctor.js";
import pharmacistRoutes from "./routes/pharmacist.js";
import receptionistRoutes from "./routes/receptionist.js";
import appointmentRoutes from "./routes/appointment.js";
import appointmentByPatientRoutes from "./routes/appointmentByPatient.js";
import prescriptionRoutes from "./routes/prescription.js";
import clinicRoutes from "./routes/clinic.js";
import invoiceRoutes from "./routes/invoice.js";
import departmentRoutes from "./routes/department.js";
// import kafkaRouter from "./routes/kafkaRoutes.js";
import cashierRoutes from "./routes/cashier.js";
import labTestRoutes from "./routes/labTest.js";
import laboratoryTechnicianRoutes from "./routes/laboratoryTechnician.js";
import { connectProducer as connectAppointmentProducer } from "./kafka/producer.js";
import { runConsumerDepartment } from "./kafka/departmentConsumer.js";
import { connectRedis } from "./redis/redisClient.js";
import queueRoutes from "./routes/redis.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import cors from "cors";
import { runConsumerPharmacist } from "./kafka/pharmacistConsumer.js";
import { runConsumerLabTest } from "./kafka/labTestConsumer.js";
const app = express();
const port = process.env.PORT || 3000;

// Kết nối đến MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));
const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:8888"], // Allow requests from your client

  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", routerDoctor);
app.use("/api/pharmacists", pharmacistRoutes);
app.use("/api/receptionists", receptionistRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/appointmentsByPatient", appointmentByPatientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/cashier", cashierRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/laboratory-technicians", laboratoryTechnicianRoutes);
app.use("/api/labTests", labTestRoutes);
// Hàm khởi động ứng dụng

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  // startApp();
});
const startApp = async () => {
  await connectRedis();
  await connectAppointmentProducer(); // Kết nối producer cho lịch hẹn
  // await connectConsumer();
  // // await connectExamRoomProducer(); // Kết nối producer cho buồng khám
  await runConsumerDepartment(); // Chạy consumer
  await runConsumerPharmacist();
  await runConsumerLabTest();
};
