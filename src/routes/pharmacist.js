// pharmacistRouter.js
import express from "express";
import {
  completePrescriptionController,
  createPrescriptionBillController,
  getListPharmacistsController,
  listPrescriptionsController,
  prescriptionByIdController,
  createPharmacistController,
  getOnePharmacistByIdController,
} from "../controllers/pharmacistController.js";

const routerPharmacist = express.Router();

routerPharmacist.get("/get-list-prescriptions", listPrescriptionsController); // có đụng redis

routerPharmacist.post("/", createPharmacistController);

routerPharmacist.post(
  "/create-prescriptionBill",
  createPrescriptionBillController
);

routerPharmacist.get("/", getListPharmacistsController);

routerPharmacist.get("/:id", getOnePharmacistByIdController);

routerPharmacist.get("/prescriptionBill/:id", prescriptionByIdController);

routerPharmacist.patch(
  "/:prescriptionId/complete",
  completePrescriptionController
);

export default routerPharmacist;
