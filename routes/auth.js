// routes/auth.js
import express from 'express';
import { register, loginUser, logout } from '../controllers/authController.js';

const router = express.Router();

// Đăng ký người dùng
router.post('/register', register);

// Đăng nhập
router.post('/login', loginUser);

// Đăng xuất
router.get('/logout', logout);

export default router;
