import express from 'express';
import ServiceList from '../models/ServiceList.js'; // Model ServiceList
import Invoice from '../models/Invoice.js'; // Model Invoice
import Patient from '../models/Patient.js'; // Model Patient
import Doctor from '../models/Doctor.js'; // Model Doctor

const router = express.Router();

// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
router.post('/create-invoice', async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;

        // Kiểm tra xem bác sĩ và bệnh nhân có tồn tại không
        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) {
            return res.status(404).json({ message: "Doctor or patient not found." });
        }

        // Lấy danh sách dịch vụ mà bác sĩ đã tạo cho bệnh nhân
        const serviceList = await ServiceList.findOne({ doctorId, patientId });

        if (!serviceList) {
            return res.status(404).json({ message: "Service list not found." });
        }

        // Tính tổng số tiền từ danh sách dịch vụ
        let totalAmount = serviceList.services.reduce((total, service) => total + service.cost, 0);

        // Tạo hóa đơn mới dựa trên danh sách dịch vụ
        const newInvoice = new Invoice({
            doctorId: doctor._id,
            patientId: patient._id,
            services: serviceList.services,
            totalAmount: totalAmount,
            paymentStatus: 'Pending', // Hóa đơn ban đầu có trạng thái 'Pending'
            invoiceDate: new Date(),
        });

        // Lưu hóa đơn vào cơ sở dữ liệu
        await newInvoice.save();

        return res.status(201).json({ message: "Invoice created successfully.", invoice: newInvoice });
    } catch (error) {
        console.error("Error creating invoice:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

// PUT: Cập nhật trạng thái thanh toán của hóa đơn
router.put('/update-invoice-status/:invoiceId', async (req, res) => {
  try {
      const { invoiceId } = req.params;
      const { paymentStatus } = req.body;

      // Kiểm tra trạng thái thanh toán có hợp lệ không
      if (!['Pending', 'Paid', 'Canceled'].includes(paymentStatus)) {
          return res.status(400).json({ message: "Invalid payment status." });
      }

      // Tìm hóa đơn theo ID và cập nhật trạng thái thanh toán
      const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, { paymentStatus }, { new: true });

      if (!updatedInvoice) {
          return res.status(404).json({ message: "Invoice not found." });
      }

      return res.status(200).json({ message: "Invoice status updated successfully.", invoice: updatedInvoice });
  } catch (error) {
      console.error("Error updating invoice status:", error);
      return res.status(500).json({ message: "Internal server error." });
  }
});


export default router;
