import { sendMessage } from "../kafka/producer.js";
import { createPrescriptionRepo } from "../repositories/prescriptionRepository.js";
import ServiceList from "../models/ServiceList.js";
import { getOnePatientById } from "../repositories/patientRepository.js";
// import { redisClient } from "../redis/redisClient.js";
import { getAppointmentsFromQueue, removeAppointmentFromQueue } from "../repositories/queueRepository.js";
import { getSpecializations } from "../repositories/doctorRepository.js";
import { createRequestTest } from "../repositories/requestTestRepository.js";

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
    console.log(patientsData);
    const patientToDelete = patientsData.find(data => {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        return parsedData && parsedData.id === patientId;
      } catch (error) {
        return false;
      }
    });

    // if (!patientToDelete) {
    //   throw new Error('Patient not found' );
    // }

    await removeAppointmentFromQueue(queueKey, patientToDelete);
    return "appointment completed successfully";
    // res.status(200).json({ success: true, message: 'Patient removed successfully' });
  } catch (err) {
    console.log("error in", err);
    throw new Error('Internal Server Error');
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

    return parsedAppointmentsData;
  } catch (err) {
    throw new Error({ success: false, message: 'Internal Server Error' });
  }
};

// yêu cầu xét nghiệm 



export const createRequests = async (requestTest) => {
  const { patientId, doctorId, testType, reason, requestDate} = requestTest;

  if (!patientId || !doctorId || !testType || !reason || !requestDate) {
    throw new Error("patientId, doctorId và testType, reason, requestDate là bắt buộc");
  }

  const patient = await getOnePatientById(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }
  const requestTests = await createRequestTest(requestTest);

  await sendMessage(`LabTest-${testType}-queue`, requestTests);
  return requestTests;
};

export const getDepartmentName = async () => {
   return await getSpecializations();
}