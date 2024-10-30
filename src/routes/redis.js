import express from 'express';
import { redisClient } from '../redis/redisClient.js'; // Đường dẫn đến redisClient

const router = express.Router();


router.get('/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
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

router.delete('/:roomNumber/:patientId', async (req, res) => {
  const { roomNumber, patientId } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientsData = await redisClient.lRange(queueKey, 0, -1);

    const patientToDelete = patientsData.find(data => {
      try {
        const parsedData = JSON.parse(data);
        return parsedData && parsedData.id === patientId;
      } catch (error) {
        return false;
      }
    });

    if (!patientToDelete) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    await redisClient.lRem(queueKey, 1, patientToDelete);

    res.status(200).json({ success: true, message: 'Patient removed successfully' });
  } catch (err) {
    console.error('Error removing patient from queue:', err);
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
