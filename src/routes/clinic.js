import express from 'express';
import {
    createClinicController,
    listClinicsController,
    getClinicByIdController,
    updateClinicController,
    deleteClinicController
} from '../controllers/clinicController.js';

const routerClinic = express.Router();

// Tạo clinic mới
routerClinic.post("/", createClinicController);

// Lấy danh sách clinics
routerClinic.get("/", listClinicsController);

// Lấy chi tiết một clinic
routerClinic.get("/:id", getClinicByIdController);

// Cập nhật thông tin clinic
routerClinic.patch("/:id", updateClinicController);

// Xóa clinic
routerClinic.delete("/:id", deleteClinicController);

export default routerClinic;
