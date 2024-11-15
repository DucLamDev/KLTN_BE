// pharmacistRouter.js
import express from "express";
import {
  completePrescriptionController,
  createPrescriptionBillController,
  getListPharmacistsController,
  listPrescriptionsController,
  prescriptionByIdController,
  getOnePharmacistByEmailController,
  createPharmacistController,
  getOnePharmacistByIdController,
} from "../controllers/pharmacistController.js";

const routerPharmacist = express.Router();

// Get all prescriptions from the queue
routerPharmacist.get("/get-list-prescriptions", listPrescriptionsController); // có đụng redis

routerPharmacist.post("/", createPharmacistController);

// Create a new prescription bill
routerPharmacist.post(
  "/create-prescriptionBill",
  createPrescriptionBillController
);

routerPharmacist.get("/", getOnePharmacistByEmailController);

routerPharmacist.get("/", getListPharmacistsController);

routerPharmacist.get("/:id", getOnePharmacistByIdController);

routerPharmacist.get("/prescriptionBill/:id", prescriptionByIdController);

routerPharmacist.patch(
  "/:prescriptionId/complete",
  completePrescriptionController
);

export default routerPharmacist;
