// pharmacistService.js
import PrescriptionBill from "../models/PrescriptionBill.js";
import { findPharmacists } from "../repositories/pharmacistRepository.js";
import { completePrescriptionRepository } from "../repositories/prescriptionRepository.js";
import { getAppointmentsFromQueue } from "../repositories/queueRepository.js";

// Get all prescriptions from Redis queue
export const getPrescriptionsFromQueue = async () => {
    const queueKey = `queue:Pharmacist`;
    const prescriptionsData = await getAppointmentsFromQueue(queueKey);

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

export const completePrescriptionService = async (prescriptionId, warehouseId) => {
  
    try {
      const prescriptionsData = await getAppointmentsFromQueue("queue:Pharmacist");
      console.log("All patients data in queue:", prescriptionsData);
  
      const prescriptionsDelete = prescriptionsData.find(data => {
        try {
          const parsedData = JSON.parse(data);
          console.log("Parsed patient data:", parsedData);
          return parsedData && parsedData._id === prescriptionId;
        } catch (error) {
          console.error("Error parsing data:", error);
          return false;
        }
      });

     await completePrescriptionRepository(prescriptionsDelete._id, warehouseId);
  
      if (!prescriptionsDelete) {
        throw new Error('Patient not found');
      }
  
      console.log("Found patient to delete:", prescriptionsDelete);
      
      await removeFromQueue("queue:Pharmacist", prescriptionsDelete);
  
      return "Appointment completed successfully";
    } catch (err) {
      console.error("Error in completeAppointment:", err);
      throw err;
    }
  };


  export const fetchPharmacist = async (email) => {
    let query = {};

  
    if (email) {
      query.email = email;
    }
  
    return await findPharmacists(query);
  };