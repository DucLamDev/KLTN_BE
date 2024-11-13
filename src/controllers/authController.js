// controllers/authController.js
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Pharmacist from "../models/Pharmacist.js";
import Cashier from "../models/Cashier.js";
import Receptionist from "../models/Receptionist.js";

import jwt from "jsonwebtoken";
import { redisClient } from "../redis/redisClient.js";

// Tạo token JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Đăng ký tài khoản
export const register = async (req, res) => {
  try {
    const { email, password, role, fullName, phone, gender } = req.body;

    // Kiểm tra nếu email bị thiếu hoặc không hợp lệ
    if (!email || email.trim() === "") {
      console.log("Email is missing or empty:", email); // Log kiểm tra
      return res.status(400).json({
        status: "fail",
        message: "Email is required and cannot be empty.",
      });
    }

    // Kiểm tra xem email đã tồn tại trong bảng User hoặc Doctor chưa
    const existingUser = await User.findOne({ email });
    // const existingDoctor = await Doctor.findOne({ email });

    if (existingUser || existingDoctor) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists.",
      });
    }

    // Nếu email chưa tồn tại, tiếp tục tạo tài khoản
    let user = await User.create({
      email,
      password,
      role,
      fullName,
      phone,
      gender,
    });

    if (role === "doctor") {
      const doctor = await Doctor.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender,
      });
      await doctor.save();
    } else if (role === "patient") {
      const patient = await Patient.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender,
      });
      await patient.save();
    } else if (role === "receptionist") {
      const receptionist = await Receptionist.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender,
      });
      await receptionist.save();
    } else if (role === "pharmacist") {
      const pharmacist = await Pharmacist.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender,
      });
      await pharmacist.save();
    } else if (role === "cashier") {
      const cashier = await Cashier.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender,
      });
      await cashier.save();
    }

    // Tạo token JWT và trả về cho người dùng
    const token = createToken(user);

    res.status(201).json({
      status: "success",
      token,
      data: {
        id: user._id,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Đăng nhập
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm kiếm người dùng theo email
    const user = await User.findOne({ email });

    // Nếu không tìm thấy người dùng hoặc mật khẩu không chính xác
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Email hoặc mật khẩu không chính xác",
      });
    }

    // Nếu người dùng là bác sĩ, đặt trạng thái isOnline = true và xử lý hàng đợi trong Redis
    if (user.role === "doctor") { 
      const doctor = await Doctor.findOne({ email });
      doctor.isOnline = true;
      await doctor.save();

      // Tạo queue cho phòng của bác sĩ trong Redis
      // const queueKey = `queue:${doctor.roomNumber}`;
      // await redisClient.del(queueKey); // Xóa queue cũ (nếu có)
      // await redisClient.lPush(queueKey, 'Queue for doctor created');
    }

    // Các hành động cụ thể khác tùy thuộc vào role của user
    // Ví dụ: Bạn có thể thêm hành động đặc biệt cho các vai trò khác như receptionist, admin, etc.
    if (user.role === "receptionist") {
      // Hành động dành cho lễ tân
      console.log("Receptionist logged in");
    }

    if (user.role === "pharmacist") {
      // Hành động dành cho dược sĩ
      console.log("Pharmacist logged in");
    }

    if (user.role === "cashier") {
      // Hành động dành cho dược sĩ
      console.log("cashier logged in");
    }

    if (user.role === "laboratory-technician") {
      // Hành động dành cho dược sĩ
      console.log("laboratory-technician logged in");
    }


    if (user.role === "admin") {
      // Hành động dành cho quản trị viên
      console.log("Admin logged in");
    }

    // Tạo JWT và lưu vào cookie
    const token = createToken(user);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Chỉ sử dụng cờ secure khi chạy trên production (HTTPS)
      sameSite: "Lax", // Cài đặt SameSite là 'Lax' để cookie được gửi với các yêu cầu điều hướng liên kết
      expires: new Date(Date.now() + 600 * 600 * 1000), // Cookie expires in 10 hours
    });

    // Trả về thông tin người dùng và vai trò của họ
    res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      data: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
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
        status: "fail",
        message: "Không thể tìm thấy người dùng để logout",
      });
    }

    // Nếu là bác sĩ, đặt lại isOnline = false
    if (user.role === "doctor") {
      user.isOnline = false;
      const queueKey = `queue:${user.roomNumber}`;
      await redisClient.del(queueKey); // Xóa queue khi bác sĩ offline
      user.roomNumber = "000";
      // Xóa queue của bác sĩ trong Redis
      await user.save();
    }

    // Xóa cookie chứa token JWT
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Chỉ sử dụng cờ secure khi chạy trên production (HTTPS)
      sameSite: "Lax", // Cài đặt SameSite là 'Lax' để cookie được gửi với các yêu cầu điều hướng liên kết
      expires: new Date(Date.now() - 1),
    });

    res.status(200).json({
      status: "success",
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
