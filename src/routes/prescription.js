import express from "express";
import {
  createPrescriptionController,
  getListPrescriptionsController,
  getOnePrescriptionByIdController,
  updatePrescriptionByIdController,
  deletePrescriptionByIdController,
  completePrescriptionController,
  getMedicationFluctuationsController,
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", createPrescriptionController);

router.get("/", getListPrescriptionsController);

router.get("/medication-fluctuations", getMedicationFluctuationsController);

router.get("/:id", getOnePrescriptionByIdController);

router.put("/:id", updatePrescriptionByIdController);

router.delete("/:id", deletePrescriptionByIdController);

router.post("/complete", completePrescriptionController);

export default router;
