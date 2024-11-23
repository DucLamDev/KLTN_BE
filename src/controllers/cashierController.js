import {
  createCashierService,
  getListCashiersService,
  getOneCashierByIdService,
  updateCashierByIdService,
  deleteCashierByIdService,
  createInvoice,
  updateInvoiceStatus,
  getCashierByEmail,
} from "../services/cashierServices.js";

// POST: Xuất hóa đơn cho bệnh nhân dựa trên danh sách dịch vụ từ bác sĩ
export const createInvoiceController = async (req, res) => {
  const { patientId, doctorId, cashierId } = req.body;
  try {
    const result = await createInvoice(patientId, doctorId, cashierId);
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

export const createCashierController = async (req, res) => {
  try {
    const newCashier = await createCashierService(req.body);
    res.status(201).json({
      success: true,
      message: "Cashier created successfully",
      data: newCashier,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListCashiersController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const cashier = await getCashierByEmail(email);
      res.status(200).json(cashier);
    } else {
      const cashiers = await getListCashiersService();
      res.status(200).json(cashiers);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneCashierByIdController = async (req, res) => {
  try {
    const cashier = await getOneCashierByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: cashier,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCashierByIdController = async (req, res) => {
  try {
    const updatedCashier = await updateCashierByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Cashier updated successfully",
      data: updatedCashier,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCashierByIdController = async (req, res) => {
  try {
    await deleteCashierByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Cashier deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
