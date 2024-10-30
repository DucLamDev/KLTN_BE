import { createAppointment, listAppointments, getAppointmentById, updateAppointment, deleteAppointment} from '../services/appointmentServices.js';
// import { listAppointments as listServiceAppointments } from '../services/appointmentService.js';
// import { getAppointmentById as getServiceAppointmentById } from '../services/appointmentService.js';
// import { updateAppointment as updateServiceAppointment } from '../services/appointmentService.js';
// import { deleteAppointment as deleteServiceAppointment } from '../services/appointmentService.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(202).json({
      message: 'Yêu cầu cuộc hẹn đã được tiếp nhận và đang xử lý',
      appointment,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const listAppointments = async (req, res) => {
  try {
    const appointments = await listAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await deleteAppointment(req.params.id);
    res.status(200).json({ message: 'Appointment deleted', appointment });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
