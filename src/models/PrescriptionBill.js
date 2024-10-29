import mongoose from 'mongoose';

// Schema cho các dịch vụ sử dụng
const prescriptions = new mongoose.Schema({
    serviceName: { type: String, required: true },
    cost: { type: Number, required: true },
});

function generateUniqueId() {
    const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
    return `BTT-${randomString}`;
  }
// Schema hóa đơn dịch vụ
const prescriptionBillSchema = new mongoose.Schema({
    _id: { type: String, auto: false },
    patientId: { type: String},
    doctorId: { type: String},
    pharmacistId: {type: String},
    services: [prescriptions],  // Danh sách các xét nghiệm đã làm
    totalAmount: { type: Number, required: true },  // Tổng chi phí
    invoiceDate: { type: Date, default: Date.now }, // Ngày lập hóa đơn
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Canceled'],
        default: 'Pending' 
    },
});

prescriptionBillSchema.pre('save', async function (next) {
    if (this.isNew) {
      let uniqueId;
      let isUnique = false;
  
      // Kiểm tra tính duy nhất của ID
      while (!isUnique) {
        uniqueId = generateUniqueId();
        const existingPrescriptionBill = await mongoose.models.PrescriptionBill.findOne({ _id: uniqueId });
        isUnique = !existingPrescriptionBill; // Kiểm tra xem ID có tồn tại không
      }
  
      this._id = uniqueId; // Gán ID duy nhất
    }
    next();
  });

const PrescriptionBill = mongoose.model('prescriptionBill', prescriptionBillSchema);
export default PrescriptionBill;