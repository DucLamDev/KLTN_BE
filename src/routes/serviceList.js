import express from 'express';
import * as serviceListController from '../controllers/serviceListController.js';

const router = express.Router();

// Tạo một service list mới
router.post('/', serviceListController.createServiceList);

// Lấy danh sách tất cả các service list
router.get('/', serviceListController.getAllServiceLists);

// Lấy chi tiết một service list
router.get('/:id', serviceListController.getServiceListById);

// Cập nhật thông tin của một service list
router.put('/:id', serviceListController.updateServiceList);

// Xóa một service list
router.delete('/:id', serviceListController.deleteServiceList);

export default router;