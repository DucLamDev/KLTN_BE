
import Cashier from '../models/Cashier.js';


// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
export const createInvoiceController =  async (req, res) => {
    const { patientId, doctorId } = req.body;
    try {
      const result = await createInvoice(patientId, doctorId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateInvoiceStatusController = async (req, res) => {
    const { invoiceId, paymentStatus } = req.body;
    try {
      const result = await updateInvoiceStatus(invoiceId, paymentStatus);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


