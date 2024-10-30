// pharmacistService.js
import PrescriptionBill from "../models/PrescriptionBill.js";
import { redisClient } from "../redis/redisClient.js";

// Get all prescriptions from Redis queue
export const getPrescriptionsFromQueue = async () => {
    const queueKey = `queue:Pharmacist`;
    const prescriptionsData = await redisClient.lRange(queueKey, 0, -1);

    const parsedData = prescriptionsData
        .map((data) => {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error(`Invalid JSON data: ${data}`);
                return null;
            }
        })
        .filter((data) => data !== null);

    return parsedData;
};

// Create a new prescription bill
export const createPrescriptionBill = async (billData) => {
    const { patientId, doctorId, pharmacistId, services } = billData;
    const totalAmount = services.reduce((total, service) => total + service.cost, 0);

    const newPrescriptionBill = new PrescriptionBill({
        patientId,
        doctorId,
        pharmacistId,
        services,
        totalAmount
    });

    return await newPrescriptionBill.save();
};

// Get a specific prescription bill by ID
export const getPrescriptionBillById = async (id) => {
    const bill = await PrescriptionBill.findById(id);
    if (!bill) throw new Error("Prescription bill not found");
    return bill;
};
