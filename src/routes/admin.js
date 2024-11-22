import express from "express";
import {
  createAdminController,
  getListAdminsController,
  getOneAdminByIdController,
  updateAdminByIdController,
  deleteAdminByIdController,
  getSpecializationStats,
  getCompletedAppointmentsByMonthController,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/", createAdminController);

router.get("/report/month/:year", getCompletedAppointmentsByMonthController);

router.get("/report", getSpecializationStats);

router.get("/", getListAdminsController);

router.get("/:id", getOneAdminByIdController);

router.put("/:id", updateAdminByIdController);

router.delete("/:id", deleteAdminByIdController);


export default router;
