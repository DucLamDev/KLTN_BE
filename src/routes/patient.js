import express from "express";
import {
  createPatientController,
  getListPatientsController,
  getOnePatientByIdController,
  updatePatientByIdController,
  deletePatientByIdController,
} from "../controllers/patientController.js";
import Patient from "../models/Patient.js";

const router = express.Router();

router.post("/", createPatientController);

router.get("/", getListPatientsController);

router.get("/:id", getOnePatientByIdController);

router.put("/:id", updatePatientByIdController);

router.delete("/:id", deletePatientByIdController);

router.get("/clerk/:clerkId", async (req, res) => {
  try {
    const { clerkId } = req.params;
    const patients = await Patient.findOne({ clerkId });
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
