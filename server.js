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
import { connectProducer as connectExamRoomProducer } from "./kafka/roomProducer.js"; // Kết nối producer cho buồng khám
import { runConsumerDepartment } from "./kafka/departmentConsumer.js";
import { connectConsumer } from "./kafka/roomConsumer.js";
import examRoomRoutes from "./routes/roomData.js"; // Đường dẫn tới API phòng khám
import { connectRedis } from './redis/redisClient.js';
import queueRoutes  from "./routes/redis.js"
// import { runConsumer } from './kafka/roomConsumer.js'; // Kafka Consumer cho phòng khám
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
app.use("/appointmentsByPatient", appointmentByPatientRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/kafka", kafkaRouter);
app.use("/room", examRoomRoutes);
app.use("/queue", queueRoutes); 
// Hàm khởi động ứng dụng

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  startApp();
});
const startApp = async () => {
  await connectRedis();
  await connectAppointmentProducer(); // Kết nối producer cho lịch hẹn
  await connectConsumer();
  await connectExamRoomProducer(); // Kết nối producer cho buồng khám
  await runConsumerDepartment(); // Chạy consumer
};
