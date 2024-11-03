// pharmacistRouter.js
import express from "express";
import { createPrescriptionBillController, listPrescriptionsController, prescriptionByIdController } from "../controllers/pharmacistController.js";

const routerPharmacist = express.Router();

// Get all prescriptions from the queue
routerPharmacist.get("/get-list-prescriptions", listPrescriptionsController); // có đụng redis

// Create a new prescription bill
routerPharmacist.post('/create-prescriptionBill', createPrescriptionBillController);

// Get a specific prescription bill by ID
routerPharmacist.get('/prescriptionBill/:id', prescriptionByIdController);

export default routerPharmacist;
