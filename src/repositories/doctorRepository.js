import Doctor from "../models/Doctor.js";

export const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

export const getListDoctors = async () => {
  return await Doctor.find();
};

export const findDoctors = async (query) => {
  return await Doctor.find(query);
};

export const getOneDoctorById = async (id) => {
  return await Doctor.findById(id);
};

export const updateDoctorById = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const updateDoctorOnlineStatus = async (
  doctorId,
  isOnline,
  roomNumber
) => {
  return await Doctor.findByIdAndUpdate(
    doctorId,
    { isOnline, roomNumber },
    { new: true, runValidators: true }
  );
};

export const deleteDoctorById = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};

export const getSpecializations = async () => {
  return await Doctor.distinct("specialization");
};

export const getAppointmentsByDateRepository = async (doctorId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const appointments = await Doctor.aggregate([
      { $match: { _id: doctorId } },
      { $unwind: "$appointmentList" },
      {
        $match: {
          "appointmentList.appointmentDate": {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      { $project: { appointmentList: 1, _id: 0 } },
    ]);

    return appointments.map((item) => item.appointmentList);
  } catch (error) {
    throw error; // Ném lỗi lên service để xử lý
  }
};
