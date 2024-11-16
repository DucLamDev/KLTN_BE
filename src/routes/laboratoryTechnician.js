import express from "express";
import {
  createLaboratoryTechnicianController,
  getListLaboratoryTechniciansController,
  getLaboratoryTechnicianByIdController,
  updateLaboratoryTechnicianController,
  deleteLaboratoryTechnicianController,
} from "../controllers/laboratoryTechnicianController.js";

const routerLaboratoryTechnician = express.Router();

routerLaboratoryTechnician.post("/", createLaboratoryTechnicianController); // Admin

routerLaboratoryTechnician.get("/", getListLaboratoryTechniciansController); // ADmin

routerLaboratoryTechnician.get("/:id", getLaboratoryTechnicianByIdController);

routerLaboratoryTechnician.patch("/:id", updateLaboratoryTechnicianController);

routerLaboratoryTechnician.delete("/:id", deleteLaboratoryTechnicianController);

export default routerLaboratoryTechnician;
