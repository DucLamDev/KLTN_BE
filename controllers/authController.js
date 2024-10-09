// controllers/authController.js
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import {redisClient} from '../redis/redisClient.js';

// Tạo token JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Đăng ký tài khoản
export const register = async (req, res) => {
  try {
    const { email, password, role, specialization, roomNumber} = req.body;

    let user;

    // Nếu vai trò là bác sĩ, tạo tài khoản bác sĩ
    if (role === 'doctor') {
      user = await Doctor.create({
        email,
        password,
        role,
        specialization,
        roomNumber// Lưu số phòng cho bác sĩ
      });
    } else {
      // Nếu không, tạo tài khoản người dùng bình thường
      user = await User.create({ email, password, role });
    }

    // Tạo token JWT và trả về cho người dùng
    const token = createToken(user);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        id: user._id,
        role: user.role
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};


// Đăng nhập
export const loginUser = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Kiểm tra xem user có phải bác sĩ hay không
    const user = await Doctor.findOne({ email }) ? await Doctor.findOne({ email }) : await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    // Nếu là bác sĩ, đặt lại isOnline = true
    if (user.role === 'doctor') {
      user.isOnline = true;
      await user.save();

      // Tạo queue cho phòng của bác sĩ trong Redis
      const queueKey = `queue:${user.roomNumber}`;
      await redisClient.del(queueKey); // Xóa queue cũ (nếu có)
      await redisClient.lPush(queueKey, 'Queue for doctor created');
    }

    // Tạo JWT và lưu vào cookie
    const token = createToken(user);

    res.cookie('jwt', token, {
      httpOnly: true, 
      expires: new Date(Date.now() + 600 * 600 * 1000), 
    });

    res.status(200).json({
      status: 'success',
      message: 'Đăng nhập thành công',
      data: {
        id: user._id,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};


// authController.js
export const logout = async (req, res) => {
  try {
    // Xác định user từ request
    const user = req.user;


    // Nếu user không tồn tại, trả về lỗi
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Không thể tìm thấy người dùng để logout',
      });
    }

    // Nếu là bác sĩ, đặt lại isOnline = false
    if (user.role === 'doctor') {
      user.isOnline = false;
      const queueKey = `queue:${user.roomNumber}`;
      await redisClient.del(queueKey); // Xóa queue khi bác sĩ offline
      user.roomNumber = "000";
      // Xóa queue của bác sĩ trong Redis
      await user.save();

    }

    // Xóa cookie chứa token JWT
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      status: 'success',
      message: 'Đăng xuất thành công',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

