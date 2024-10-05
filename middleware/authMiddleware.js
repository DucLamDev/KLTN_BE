// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

export const protect = async (req, res, next) => {
  try {
    // Kiểm tra xem token có tồn tại trong cookie không
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Bạn chưa đăng nhập',
      });
    }

    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    // Kiểm tra role của người dùng, tìm trong bảng User hoặc Doctor
    if (decoded.role === 'doctor') {
      // Nếu role là 'doctor', tìm trong bảng Doctor
      user = await Doctor.findById(decoded.id);
    } else {
      // Nếu role là user, tìm trong bảng User
      user = await User.findById(decoded.id);
    }

    // Kiểm tra người dùng có tồn tại không
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Người dùng không tồn tại',
      });
    }

    // Gắn thông tin người dùng vào request
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Xác thực không hợp lệ',
    });
  }
};
