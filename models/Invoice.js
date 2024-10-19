import mongoose from 'mongoose';

// Schema cho các dịch vụ sử dụng
const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    cost: { type: Number, required: true },
});

// Schema hóa đơn
const invoiceSchema = new mongoose.Schema({
    patientId: { type: String, ref: 'Patient', required: true },
    doctorId: { type: String, ref: 'Doctor', required: true },
    cashierID: {type: String, ref: 'Cashier', required: true},
    services: [serviceSchema],  // Danh sách các dịch vụ sử dụng
    totalAmount: { type: Number, required: true },  // Tổng chi phí
    invoiceDate: { type: Date, default: Date.now }, // Ngày lập hóa đơn
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Canceled'], 
        default: 'Pending' 
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;