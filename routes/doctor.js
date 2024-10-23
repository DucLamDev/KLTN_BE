import express from "express";
import ServiceList from "../models/ServiceList.js"; // Import model ServiceList
import Doctor from "../models/Doctor.js"; // Import model Doctor
import Patient from "../models/Patient.js"; // Import model Patient
import Prescription from "../models/Prescription.js";
import { sendMessage } from "../kafka/producer.js";

const router = express.Router();

// Tạo bác sĩ mới
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/create-prescription", async (req, res) => {
  const { patientId, doctorId, medications, dateIssued } = req.body;

  if (!patientId || !doctorId || !medications || !dateIssued) {
    return res.status(400).json({
      message: "patientId, doctorId và medications, dateIssued  là bắt buộc",
    });
  }

  const prescriptionRequest = {
    patientId,
    doctorId,
    medications,
    dateIssued,
  };
  const prescription = await Prescription.create(prescriptionRequest);
  await prescription.save();

  try {
    await sendMessage(`Pharmacist-Queue`, prescription);
    res
      .status(202)
      .json({ message: "Tao thuốc đã được tiếp nhận và đang xử lý" });
  } catch (err) {
    res.status(500).json({
      message: "Không thể xử lý yêu cầu cuộc hẹn",
      error: err.message,
    });
  }
});

//Yêu cầu tạo dịch vụ khám cho bệnh nhân ( ví dụ như sau khi tư vấn và kiểm tra thì bệnh nhân cần xét nghiệm....)
router.post("/create-service-list", async (req, res) => {
  try {
    const { doctorId, patientId, services } = req.body;

    // Kiểm tra xem bác sĩ và bệnh nhân có tồn tại không
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: "Doctor or patient not found." });
    }

    // Tính tổng số tiền từ danh sách dịch vụ
    let totalAmount = services.reduce(
      (total, service) => total + service.cost,
      0
    );

    // Tạo danh sách dịch vụ mới
    const newServiceList = new ServiceList({
      doctorId: doctor._id,
      patientId: patient._id,
      services,
      totalAmount,
      status: "Pending",
      // createdAt: new Date()
    });

    // Lưu danh sách dịch vụ vào cơ sở dữ liệu
    await newServiceList.save();

    return res.status(201).json({
      message: "Service list created successfully.",
      serviceList: newServiceList,
    });
  } catch (error) {
    console.error("Error creating service list:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});
//tạo 1 danh sách bác sĩ
router.post("/add-list", async (req, res) => {
  try {
    const doctorsData = req.body; // Lấy dữ liệu bác sĩ từ body

    // Kiểm tra xem dữ liệu có phải là một mảng hay không
    if (!Array.isArray(doctorsData)) {
      return res
        .status(400)
        .json({ message: "Data must be an array of doctors." });
    }

    // Thêm danh sách bác sĩ vào MongoDB
    const addedDoctors = await Doctor.insertMany(doctorsData);

    return res.status(201).json({
      message: "Doctors added successfully",
      data: addedDoctors,
    });
  } catch (error) {
    console.error("Error adding doctors:", error);
    return res.status(500).json({ message: "Error adding doctors", error });
  }
});

// Lấy danh sách bác sĩ
router.get("/", async (req, res) => {
  try {
    const { specialization, email } = req.query;
    let query = {};

    if (specialization) {
      query.specialization = specialization;
    }

    if (email) {
      query.email = email;
    }

    const doctors = await Doctor.find(query);

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
});

// Lấy danh sách các chuyên ngành khác nhau
router.get("/specializations", async (req, res) => {
  try {
    const specializations = await Doctor.distinct("specialization");
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message,
    });
  }
});

// Lấy chi tiết một bác sĩ
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin bác sĩ
router.patch("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa bác sĩ
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
