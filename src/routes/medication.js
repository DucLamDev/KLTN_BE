import express from "express";
import {
  createMedicationController,
  getListMedicationsController,
  getOneMedicationByIdController,
  updateMedicationByIdController,
  deleteMedicationByIdController,
} from "../controllers/medicationController.js";

const routerMedication = express.Router();

routerMedication.post("/", createMedicationController);

routerMedication.get("/", getListMedicationsController);

routerMedication.get("/:id", getOneMedicationByIdController);

routerMedication.put("/:id", updateMedicationByIdController);

routerMedication.delete("/:id", deleteMedicationByIdController);

export default routerMedication;
