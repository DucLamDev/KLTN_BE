import { sendMessage } from "../../kafka/producer.js";
import Doctor from "../../models/Doctor.js";
import Patient from "../../models/Patient.js";
import Prescription from "../../models/Prescription.js";
import ServiceList from "../../models/ServiceList.js";

export const createPrescription = async (patientId, doctorId, medications, dateIssued

) => {
  if (!patientId || !doctorId || !medications || !dateIssued) {
    throw new Error("patientId, doctorId và medications, dateIssued  là bắt buộc");
  }
  const prescriptionRequest = {
    patientId, doctorId, medications, dateIssued
  };
  const prescription = await Prescription.create(prescriptionRequest);
  await prescription.save();

  try {
    await sendMessage(`Pharmacist-Queue`, prescription);
    return { message: "Prescription has been accepted and is being processed" };
  } catch (err) {
    throw new Error("Unable to process the prescription request: " + err.message);
  }
};


export const createServiceList = async (doctorId, patientId, services) => {
  const doctor = await Doctor.findById(doctorId);
  const patient = await Patient.findById(patientId);

  if (!doctor || !patient) {
    throw new Error("Doctor or patient not found.");
  }

  const totalAmount = services.reduce((total, service) => total + service.cost, 0);

  const newServiceList = new ServiceList({
    doctorId: doctor._id,
    patientId: patient._id,
    services,
    totalAmount,
    status: "Pending",
  });

  return await newServiceList.save();
};


// Tạo và sao lưu lịch sử khám bệnh



// Tạo yêu cầu xét nghiệm



