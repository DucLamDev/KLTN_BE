import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

export const protect = async (req, res, next) => {
  try {
    // Kiểm tra xem token có tồn tại trong cookie không
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Bạn chưa đăng nhập",
      });
    }

    // Giải mã token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        status: "fail",
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }

    // Kiểm tra xem token có chứa thông tin id và role hay không
    if (!decoded.id || !decoded.role) {
      return res.status(400).json({
        status: "fail",
        message: "Token không chứa thông tin hợp lệ",
      });
    }

    // Khởi tạo biến user
    let user;

    // Kiểm tra role của người dùng, tìm trong bảng Doctor hoặc User
    if (decoded.role === "doctor") {
      // Nếu role là 'doctor', tìm trong bảng Doctor
      user = await Doctor.findOne({ email: decoded.email });
    } else {
      // Nếu role khác, tìm trong bảng User
      user = await User.findOne({ email: decoded.email });
    }

    // Kiểm tra người dùng có tồn tại không
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Người dùng không tồn tại",
      });
    }

    // Gắn thông tin người dùng vào request để sử dụng ở các middleware khác
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Có lỗi xảy ra, vui lòng thử lại",
    });
  }
};
