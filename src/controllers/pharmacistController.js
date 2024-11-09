import {
    getPrescriptionsFromQueue,
    createPrescriptionBill,
    getPrescriptionBillById,
    completePrescriptionService
} from '../services/pharmacistServices.js';

// Get all prescriptions from the queue
export const listPrescriptionsController = async (req, res) => {
    try {
        const prescriptions = await getPrescriptionsFromQueue();

        if (!prescriptions.length) {
            return res.status(404).json({ success: false, message: "No prescription in queue" });
        }

        res.status(200).json({ success: true, data: prescriptions });
    } catch (err) {
        console.error("Error retrieving patients from queue:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Create a new prescription bill
export const createPrescriptionBillController = async (req, res) => {
    try {
        const savedBill = await createPrescriptionBill(req.body);
        res.status(200).json(savedBill);
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription bill', error });
    }
};

// Get a specific prescription bill by ID
export const prescriptionByIdController =  async (req, res) => {
    try {
        const bill = await getPrescriptionBillById(req.params.id);
        res.status(200).json(bill);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const completePrescriptionController = async (req, res) => {
    try {
        const prescriptionId = req.params.prescriptionId;
        const { warehouseId} = req.body; // Lấy dữ liệu từ request body

        const completedPrescription = await completePrescriptionService(prescriptionId, warehouseId);

        res.status(200).json(completedPrescription);

    } catch (error) {
        console.error("Error completing prescription:", error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};