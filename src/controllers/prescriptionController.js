// prescriptionRouter.js
import express from 'express';
import {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription
} from '../services/prescriptionServices.js';

const router = express.Router();

// Create a new prescription
router.post('/', async (req, res) => {
    try {
        const prescription = await createPrescription(req.body);
        res.status(200).send(prescription);
    } catch (error) {
        res.status(400).send({ message: 'Error creating prescription', error });
    }
});

// Get all prescriptions
router.get('/', async (req, res) => {
    try {
        const prescriptions = await getAllPrescriptions();
        res.status(200).send(prescriptions);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching prescriptions', error });
    }
});

// Get a specific prescription by ID
router.get('/:id', async (req, res) => {
    try {
        const prescription = await getPrescriptionById(req.params.id);
        res.status(200).send(prescription);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

// Update a prescription by ID
router.patch('/:id', async (req, res) => {
    try {
        const prescription = await updatePrescription(req.params.id, req.body);
        res.status(200).send(prescription);
    } catch (error) {
        res.status(400).send({ message: 'Error updating prescription', error });
    }
});

// Delete a prescription by ID
router.delete('/:id', async (req, res) => {
    try {
        const prescription = await deletePrescription(req.params.id);
        res.status(200).send(prescription);
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
});

export default router;
