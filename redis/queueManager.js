
import { redisClient} from '../redis/redisClient.js';

const addAppointmentToQueue = async (roomNumber, patientData) => {
  const queueKey = `queue:${roomNumber}`;
  
  try {
    if (patientData.priority) {
      // Nếu bệnh nhân có ưu tiên, đẩy lên đầu danh sách
      await redisClient.lPush(queueKey, JSON.stringify(patientData));
      console.log(`Bệnh nhân ưu tiên ${patientData.patientId} đã được thêm vào đầu danh sách chờ.`);
    } else {
      // Nếu không, đẩy vào cuối danh sách
      await redisClient.rPush(queueKey, JSON.stringify(patientData));
      console.log(`Bệnh nhân ${patientData.patientId} đã được thêm vào cuối danh sách chờ.`);
    }
  } catch (err) {
    console.error('Lỗi khi thêm bệnh nhân vào hàng đợi:', err);
  }
};

const addPrescriptionToQueue = async (prescriptionData) => {
  const queueKey = `queue:Pharmacist`;
  try {
    await redisClient.rPush(queueKey, JSON.stringify(prescriptionData)); // Sử dụng lPush
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

