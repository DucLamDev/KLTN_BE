import express from 'express';
import { roomData } from '../kafka/roomConsumer.js';

const router = express.Router();

// Lấy dữ liệu phòng khám theo roomNumber
router.get('/:roomNumber', (req, res) => {
  const { roomNumber } = req.params;
  if (roomData[roomNumber]) {
    return res.status(200).json({
      roomNumber,
      data: roomData[roomNumber],
    });
  } else {
    return res.status(404).json({
      message: `No data available for exam room ${roomNumber}`,
    });
  }
});

export default router;
