import {
  createAppointments,
  listAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} from "../services/appointmentServices.js";

// Tạo cuộc hẹn mới
export const createAppointmentController = async (req, res) => {
  try {
    const appointment = await createAppointments(req.body);
    res.status(202).json({
      message: "Yêu cầu cuộc hẹn đã được tiếp nhận và đang xử lý",
      appointment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy danh sách cuộc hẹn
export const listAppointmentsController = async (req, res) => {
  try {
    const appointments = await listAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết một cuộc hẹn
export const getAppointmentByIdController = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Cập nhật thông tin cuộc hẹn
export const updateAppointmentController = async (req, res) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa cuộc hẹn
export const deleteAppointmentController = async (req, res) => {
  try {
    const appointment = await deleteAppointment(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
