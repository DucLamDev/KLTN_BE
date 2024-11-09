import Prescription from "../models/Prescription.js";
import MedicineWarehouse from "../models/MedicineWarehouse.js";
import Medication from "../models/Medication.js"

export const createPrescriptionRepo = async (prescriptionData) => {
  const prescription = new Prescription(prescriptionData);
  return await prescription.save();
};

export const getListPrescriptionsRepo = async () => {
  return await Prescription.find()
};

export const getOnePrescriptionByIdRepo = async (id) => {
  return await Prescription.findById(id)    
};

export const updatePrescriptionByIdRepo = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deletePrescriptionByIdRepo = async (id) => {
  return await Prescription.findByIdAndDelete(id);
};


export const completePrescriptionRepository = async (prescriptionId, warehouseId) => {
    try {
        const prescription = await Prescription.findById(prescriptionId).populate("medications");
        if (!prescription) {
            throw new Error("Prescription not found");
        }

        const warehouse = await MedicineWarehouse.findById(warehouseId);
        if (!warehouse) {
            throw new Error("Medicine warehouse not found");
        }

        // Cập nhật số lượng thuốc trong kho
        for (const medicationItem of prescription.medications) {

            const warehouseMedication = warehouse.medications.find(
                (item) => item.medication.toString() === medicationItem.medication._id.toString() // So sánh _id của thuốc
            );
            if (warehouseMedication) {
                const medication = await Medication.findById(medicationItem.medication._id);

                if (warehouseMedication.quantity < medicationItem.quantity) {
                    throw new Error(`Not enough ${medication.medicationName} in stock`);
                }


                warehouseMedication.quantity -= medicationItem.quantity;
                await warehouse.save();



            } else {
                throw new Error(`${medicationItem.medication.medicationName} not found in warehouse`);

            }


            prescription.status = "Completed";
            await prescription.save();

        }
        return prescription;



    } catch (error) {
        throw error;
    }
};