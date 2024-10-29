import mongoose from 'mongoose';

// Schema cho hóa đơn dịch vụ
const invoiceSchema = new mongoose.Schema({
    patientId: { type: String, ref: 'Patient', required: true }, // ID bệnh nhân
    cashierId: { type: String, ref: 'Cashier', required: true }, // ID thu ngân
    services: [{ 
        serviceName: { type: String, required: true }, // Tên dịch vụ
        cost: { type: Number, required: true } // Chi phí dịch vụ
    }],
    totalAmount: { type: Number, required: true }, // Tổng chi phí
    invoiceDate: { type: Date, default: Date.now }, // Ngày lập hóa đơn
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Canceled'], 
        default: 'Pending' 
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;