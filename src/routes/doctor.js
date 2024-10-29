import express from "express";
import { createPrescription, createServiceList } from "../services/doctor/doctorServices.js";

const routerDoctor = express.Router();
routerDoctor.post("/create-prescription", async (req, res) => {
  try {
    const result = await createPrescription(req.body.patientId, req.body.doctorId, red.body.medications, req.body.dateIssued);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Yêu cầu tạo dịch vụ khám cho bệnh nhân ( ví dụ như sau khi tư vấn và kiểm tra thì bệnh nhân cần xét nghiệm....)
routerDoctor.post("/create-service-list", async (req, res) => {
  const { doctorId, patientId, services } = req.body;
  try {
    const serviceList = await createServiceList(doctorId, patientId, services);
    res.status(200).json({ message: "Service list created successfully.", serviceList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
});
export default routerDoctor;
