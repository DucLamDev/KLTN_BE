import mongoose from 'mongoose';


const LabTestInvoiceSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    patientId: { type: String, ref: 'Patient', required: true },
    doctorId: { type: String, ref: 'Doctor', required: true },
    technicianId: { type: String, ref: 'LaboratoryTechnician', required: true },
    cashierId: { type: String, ref: 'Cashier', required: true },
    labTests: [
        {
            labTestId: { type: String, ref: 'LabTest', required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true, 
        default: function () {
            return this.labTests.reduce((total, test) => total + test.price, 0);
        }
    },
    invoiceDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
});

module.exports = mongoose.model('LabTestInvoice', LabTestInvoiceSchema);
