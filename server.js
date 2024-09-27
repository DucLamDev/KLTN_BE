import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import patientRoutes from "./routes/patient.js";
import doctorRoutes from "./routes/doctor.js";
import pharmacistRoutes from "./routes/pharmacist.js";
import labTestRoutes from "./routes/labTest.js";
import receptionistRoutes from "./routes/receptionist.js";
import appointmentRoutes from "./routes/appointment.js";
import prescriptionRoutes from "./routes/prescription.js";
import invoiceRoutes from "./routes/invoice.js";
import { connectProducer } from "./kafka/producer.js";
import { runConsumer } from "./kafka/consumer.js";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3001", // Allow requests from your client
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://DucLam:kr7i8EBTmZqwuiRX@clinic-management.hmcis.mongodb.net/?retryWrites=true&w=majority&appName=clinic-management",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/patients", patientRoutes);
app.use("/doctors", doctorRoutes);
app.use("/pharmacists", pharmacistRoutes);
app.use("/labTests", labTestRoutes);
app.use("/receptionists", receptionistRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/invoices", invoiceRoutes);

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  // await connectProducer();
});

const startApp = async () => {
  // await connectToMongoDB();
  await connectProducer();
  await runConsumer();

  // Ví dụ: Gửi một message (có thể loại bỏ nếu không cần)
  // await sendMessage('appointment-requests', {
  //   patientId: '60d5ec49f8d4e12b4c8f9a1b',
  //   appointmentDate: new Date(),
  //   reason: 'Routine check-up',
  // });
};
startApp();
// runConsumer();
