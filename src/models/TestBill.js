import mongoose from 'mongoose';

// Schema cho các dịch vụ sử dụng
const testSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    cost: { type: Number, required: true },
});

// Schema hóa đơn dịch vụ
const testBillSchema = new mongoose.Schema({
    patientId: { type: String, ref: 'Patient', required: true },
    doctorId: { type: String, ref: 'Doctor', required: true },
    cashierID: {type: String, ref: 'Cashier', required: true},
    laboratoryTechnicianId: {type: String, ref: 'LaboratoryTechnician', required: true},
    services: [testSchema],  // Danh sách các xét nghiệm đã làm
    totalAmount: { type: Number, required: true },  // Tổng chi phí
    invoiceDate: { type: Date, default: Date.now }, // Ngày lập hóa đơn
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Canceled'], 
        default: 'Pending' 
    },
});

const TestBill = mongoose.model('TestBill', testBillSchema);
export default TestBill;