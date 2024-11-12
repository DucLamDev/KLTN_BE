import {
  completeAppointment,
  createDoctorService,
  createPrescriptions,
  createReExamination,
  createRequests,
  createServiceList,
  fetchDoctors,
  fetchSpecializations,
  getAppointmentsByDateService,
  getAppointmentToQueue,
  getOneDoctor,
  updateDoctorOnlineStatusService,
} from "../services/doctorServices.js";

// Tạo đơn thuốc
export const createPrescriptionController = async (req, res) => {
  try {
    const { patientId, doctorId, medications, dateIssued } = req.body;
    const result = await createPrescriptions(
      patientId,
      doctorId,
      medications,
      dateIssued
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo yêu cầu xét nghiệm
export const createRequestTestController = async (req, res) => {
  try {
    const requestTestData = req.body;
    const newRequestTest = await createRequests(requestTestData);
    res.status(201).json({
      success: true,
      message: "Test request created successfully",
      data: newRequestTest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Tạo danh sách dịch vụ
export const createServiceListController = async (req, res) => {
  const { doctorId, patientId, services } = req.body;
  try {
    const serviceList = await createServiceList(doctorId, patientId, services);
    res
      .status(200)
      .json({ message: "Service list created successfully.", serviceList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Lấy danh sách cuộc hẹn
export const getListAppointment = async (req, res) => {
  try {
    const appointment = await getAppointmentToQueue(req.params.roomNumber);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDepartmentNameController = async (req, res) => {
  try {
    const specializations = await getDepartmentName();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message,
    });
  }
};

// Hoàn thành khám
export const completeAppointmentController = async (req, res) => {
  try {
    const { roomNumber, patientId, doctorId } = req.body;
    const completeMessage = await completeAppointment(
      roomNumber,
      patientId,
      doctorId
    );
    res.status(200).json({ success: true, message: completeMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getSpecializationsController = async (req, res) => {
  try {
    const specializations = await fetchSpecializations();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message,
    });
  }
};

export const getOneDoctorController = async (req, res) => {
  try {
    const doctor = await getOneDoctor(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};

// lấy danh sách bác sĩ thuộc khoa X hoặc theo email
export const getDoctorsController = async (req, res) => {
  try {
    const { specialization, email } = req.query;
    const doctors = await fetchDoctors(specialization, email);

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bác sĩ nào với chuyên khoa này" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
};

export const getAppointmentsByDateController = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const dateString = req.params.date;

    const appointments = await getAppointmentsByDateService(
      doctorId,
      dateString
    );

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(error.statusCode || 500).json({ message: error.message }); // Trả về status code từ error
  }
};

// Tạo 1 Bác sĩ
export const createDoctorController = async (req, res) => {
  try {
    const doctorData = req.body;
    const newDoctor = await createDoctorService(doctorData);
    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: newDoctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Cập nhật 1 Bác sĩ
export const updateDoctorOnlineStatusController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { isOnline, roomNumber } = req.body;

    if (typeof isOnline !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isOnline must be a boolean value",
      });
    }

    if (typeof roomNumber !== "string" || roomNumber.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "roomNumber must be a non-empty string",
      });
    }

    const updatedDoctor = await updateDoctorOnlineStatusService(
      doctorId,
      isOnline,
      roomNumber
    );
    res.status(200).json({
      success: true,
      message: "Doctor online status updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const createReExaminationController = async (req, res) => {
  try {
    const appointment = await createReExamination(req.body);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
