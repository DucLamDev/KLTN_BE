import { createPrescriptions, createServiceList } from "../services/doctorServices.js";

// Tạo đơn thuốc
export const createPrescriptionController = async (req, res) => {
  try {
    const { patientId, doctorId, medications, dateIssued } = req.body;
    const result = await createPrescriptions(patientId, doctorId, medications, dateIssued);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo danh sách dịch vụ
export const createServiceListController = async (req, res) => {
  const { doctorId, patientId, services } = req.body;
  try {
    const serviceList = await createServiceList(doctorId, patientId, services);
    res.status(200).json({ message: "Service list created successfully.", serviceList });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};
