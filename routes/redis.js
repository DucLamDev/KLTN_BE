import express from 'express';
import { redisClient } from '../redis/redisClient.js'; // Đường dẫn đến redisClient

const router = express.Router();


router.get('/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientsData = await redisClient.lRange(queueKey, 0, -1); // Lấy tất cả bệnh nhân từ queue

    // Phân tích dữ liệu JSON
    const parsedPatientsData = patientsData.map(data => JSON.parse(data));

    res.status(200).json({ success: true, data: parsedPatientsData });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// API để lấy bệnh nhân tiếp theo từ queue
// router.get('/:roomNumber', async (req, res) => {
//   const { roomNumber } = req.params;
//   const queueKey = `queue:${roomNumber}`;

//   try {
//     const patientData = await redisClient.rPop(queueKey); // Lấy bệnh nhân từ queue

//     if (patientData) {
//       const parsedPatientData = JSON.parse(patientData); // Phân tích dữ liệu JSON
//       res.status(200).json({ success: true, data: parsedPatientData });
//     } else {
//       res.status(404).json({ success: false, message: 'No patients in queue' });
//     }
//   } catch (err) {
//     console.error('Error retrieving patient from queue:', err);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

export default router;
