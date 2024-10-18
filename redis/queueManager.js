
import { redisClient} from '../redis/redisClient.js';

const addAppointmentToQueue = async (roomNumber, patientData) => {
  const queueKey = `queue:${roomNumber}`;
  try {
    await redisClient.lPush(queueKey, JSON.stringify(patientData)); // Sử dụng lPush
    console.log(`Added appointment for patient ${patientData.patientId} to queue for room ${roomNumber}`);
  } catch (err) {
    console.error('Error adding to queue:', err);
  }
};

const addPrescriptionToQueue = async (prescriptionData) => {
  const queueKey = `queue:Pharmacist`;
  try {
    await redisClient.lPush(queueKey, JSON.stringify(prescriptionData)); // Sử dụng lPush
  } catch (err) {
    console.error('Error adding to queue:', err);
  }
};

// Hàm lấy bệnh nhân tiếp theo từ hàng đợi Redis
const getNextPatientFromQueue = async (roomNumber) => {
  const queueKey = `queue:${roomNumber}`;
  try {
    const patientData = await redisClient.rPop(queueKey); // Sử dụng rPop
    if (patientData) {
      const parsedPatientData = JSON.parse(patientData);
      console.log(`Processing patient ${parsedPatientData.patientId} in room ${roomNumber}`);
    } else {
      console.log(`No patients in queue for room ${roomNumber}`);
    }
  } catch (err) {
    console.error('Error getting from queue:', err);
  }
};

export {addAppointmentToQueue, addPrescriptionToQueue};

