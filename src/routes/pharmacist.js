// pharmacistRouter.js
import express from "express";
import { completePrescriptionController, createPrescriptionBillController, getPharmacistsController, listPrescriptionsController, prescriptionByIdController } from "../controllers/pharmacistController.js";
import Pharmacist from "../models/Pharmacist.js";

const routerPharmacist = express.Router();

// Get all prescriptions from the queue
routerPharmacist.get("/get-list-prescriptions", listPrescriptionsController); // có đụng redis

// Create a new prescription bill
routerPharmacist.post('/create-prescriptionBill', createPrescriptionBillController);

routerPharmacist.get("/:id", async (req, res) => {
    try {
        const patient = await Pharmacist.findById(req.params.id);
        if (!patient) return res.status(404).send();
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
});

// routerPharmacist.get("/", getPharmacistsController);

routerPharmacist.get('/prescriptionBill/:id', prescriptionByIdController);

routerPharmacist.patch("/:prescriptionId/complete", completePrescriptionController);

routerPharmacist.get("/", getPharmacistsController);
export default routerPharmacist;
