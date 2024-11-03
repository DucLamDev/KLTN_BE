import express from 'express';
import {
    createClinicController,
    listClinicsController,
    getClinicByIdController,
    updateClinicController,
    deleteClinicController
} from '../controllers/clinicController.js';

const routerClinic = express.Router();
//Admin, lễ tân


//doctors chỉ cần set lại roomNumber không cần care tới cái này.
// Tạo clinic mới
routerClinic.post("/", createClinicController);

// Lấy danh sách clinics
routerClinic.get("/", listClinicsController); //Lễ tân

// Lấy chi tiết một clinic
routerClinic.get("/:id", getClinicByIdController);

// Cập nhật thông tin clinic
routerClinic.patch("/:id", updateClinicController);

// Xóa clinic
routerClinic.delete("/:id", deleteClinicController);

export default routerClinic;
