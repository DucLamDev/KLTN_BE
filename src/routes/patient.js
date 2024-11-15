import express from "express";
import {
  createPatientController,
  getListPatientsController,
  getOnePatientByIdController,
  updatePatientByIdController,
  deletePatientByIdController,
  getOnePatientByClerkIdController,
} from "../controllers/patientController.js";

const routerPatient = express.Router();

routerPatient.post("/", createPatientController);

routerPatient.get("/:id", getOnePatientByIdController);

routerPatient.get("/", getListPatientsController);

routerPatient.put("/:id", updatePatientByIdController);

routerPatient.delete("/:id", deletePatientByIdController);

routerPatient.get("/clerk/:clerkId", getOnePatientByClerkIdController);
export default routerPatient;
