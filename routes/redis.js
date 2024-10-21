import express from 'express';
import { redisClient } from '../redis/redisClient.js'; // Đường dẫn đến redisClient

const router = express.Router();


router.get('/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    // Lấy tất cả bệnh nhân từ hàng đợi Redis
    const patientsData = await redisClient.lRange(queueKey, 0, -1);

    if (!patientsData.length) {
      return res.status(404).json({ success: false, message: 'No patients in queue' });
    }

    // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
    const parsedPatientsData = patientsData.map(data => {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(`Invalid JSON data: ${data}`);
        return null; // Trả về null nếu dữ liệu không hợp lệ
      }
    }).filter(data => data !== null); // Lọc bỏ những phần tử không hợp lệ

    res.status(200).json({ success: true, data: parsedPatientsData });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
router.get('/api/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    // Lấy tất cả bệnh nhân từ hàng đợi Redis
      const patientsData = await redisClient.rPop(queueKey); // Sử dụng rPop
      if (patientsData) {
        const parsedPatientData = JSON.parse(patientsData);
        console.log(`Processing patient ${parsedPatientData.patientId} in room ${roomNumber}`);
      } else {
        console.log(`No patients in queue for room ${roomNumber}`);
      }

    if (!patientsData.length) {
      return res.status(404).json({ success: false, message: 'No patients in queue' });
    }

    const parsedPatientData = JSON.parse(patientsData);
    // Phân tích dữ liệu JSON
    // const parsedPatientsData = patientsData.map(data => {
    //   try {
    //     return JSON.parse(data);
    //   } catch (error) {
    //     console.error('Error parsing patient data:', error);
    //     return null; // Nếu lỗi, trả về null
    //   }
    // }).filter(data => data !== null); // Lọc bỏ những phần tử bị lỗi JSON.parse

    res.status(200).json({ success: true, data: parsedPatientData });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// API để lấy bệnh nhân tiếp theo từ queue
router.get('/get-one/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientData = await redisClient.rPop(queueKey); // Lấy bệnh nhân từ queue

    if (patientData) {
      const parsedPatientData = JSON.parse(patientData); // Phân tích dữ liệu JSON
      res.status(200).json({ success: true, data: parsedPatientData });
    } else {
      res.status(404).json({ success: false, message: 'No patients in queue' });
    }
  } catch (err) {
    console.error('Error retrieving patient from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
