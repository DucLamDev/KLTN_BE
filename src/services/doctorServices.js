import { sendMessage } from "../kafka/producer.js";
import { createPrescriptionRepo } from "../repositories/prescriptionRepository.js";
import ServiceList from "../models/ServiceList.js";
import { getOnePatientById } from "../repositories/patientRepository.js";
import { redisClient } from "../redis/redisClient.js";
import { getAppointmentsFromQueue, removeAppointmentFromQueue } from "../repositories/queueRepository.js";

export const createPrescriptions = async (patientId, doctorId, medications, dateIssued) => {
  if (!patientId || !doctorId || !medications || !dateIssued) {
    throw new Error("patientId, doctorId và medications, dateIssued  là bắt buộc");
  }
  const prescriptionRequest = {
    patientId, doctorId, medications, dateIssued
  };
  const prescription = await createPrescriptionRepo(prescriptionRequest);

  try {
    await sendMessage(`Pharmacist-Queue`, prescription);
    return { message: "Prescription has been accepted and is being processed" };
  } catch (err) {
    throw new Error("Unable to process the prescription request: " + err.message);
  }
};


export const createServiceList = async (doctorId, patientId, services) => {
  const doctor = await getOneDoctorById(doctorId);
  const patient = await getOnePatientById(patientId);

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

// Hoàn thành khám

export const completeAppointment =  async (roomNumber, patientId) => {
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientsData = await getAppointmentsFromQueue(queueKey);

    const patientToDelete = patientsData.find(data => {
      try {
        const parsedData = JSON.parse(data);
        return parsedData && parsedData.id === patientId;
      } catch (error) {
        return false;
      }
    });

    if (!patientToDelete) {
      throw new Error({ success: false, message: 'Patient not found' });
    }

    await removeAppointmentFromQueue(queueKey, patientToDelete);

    res.status(200).json({ success: true, message: 'Patient removed successfully' });
  } catch (err) {
    throw new Error({ success: false, message: 'Internal Server Error' });
  }
};

// Tạo yêu cầu xét nghiệm



//gọi bệnh nhân từ hàng đợi
export const getAppointmentToQueue = async (roomNumber) => {
     const queueKey = `queue:${roomNumber}`;

  try {
    const appointmentsData = await getAppointmentsFromQueue(queueKey);

    if (!appointmentsData.length) {
      return res.status(404).json({ success: false, message: 'No patients in queue' });
    }

    // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
    const parsedAppointmentsData = appointmentsData.map(data => {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(`Invalid JSON data: ${data}`);
        return null; // Trả về null nếu dữ liệu không hợp lệ
      }
    }).filter(data => data !== null); // Lọc bỏ những phần tử không hợp lệ

    res.status(200).json({ success: true, data: parsedAppointmentsData });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};