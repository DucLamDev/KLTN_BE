import Admin from "../models/Admin.js";
import Appointment from "../models/Appointment.js";
import moment from "moment";
export const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
};

export const getListAdmins = async () => {
  return await Admin.find();
};

export const findAdmin = async (query) => {
  return await Admin.findOne(query);
};

export const getOneAdminById = async (id) => {
  return await Admin.findById(id);
};

export const updateAdminById = async (id, updateData) => {
  return await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteAdminById = async (id) => {
  return await Admin.findByIdAndDelete(id);
};


//Thống kế các cuộc hẹn đã hoàn thành trong theo từng tháng
export const getCompletedAppointmentsByMonth = async (year) => {
    return  await Appointment.aggregate([
      {
        $match: {
          appointmentDate: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`), // Kết thúc của năm được chỉ định
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$appointmentDate" },
            year: { $year: "$appointmentDate" }
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, // Loại bỏ trường _id
          month: "$_id.month",
          year: "$_id.year",
          count: 1,
        },
      },
      {
        $sort: { year: 1, month: 1} // Sắp xếp theo năm và tháng
      }
    ]);
};


export const getAppointmentsBySpecialization = async () => {
    return await Appointment.aggregate([
      {
        $group: {
          _id: "$specialization", 
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,  
          specialization: "$_id",
          count: 1,  
        },
      },
      {
        $sort: { count: -1 }
      }
    ]);
}

