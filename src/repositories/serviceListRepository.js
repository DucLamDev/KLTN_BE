import ServiceList from "../models/ServiceList.js";

// Tạo dịch vụ mới
export const createServiceList = async (data) => {
  const service = new ServiceList(data);
  return await service.save();
};

// Lấy tất cả dịch vụ
export const getAllServiceLists = async () => {
  return await ServiceList.find().populate("doctorId patientId");
};

// Lấy dịch vụ theo ID
export const getServiceListById = async (id) => {
  return await ServiceList.findById(id).populate("doctorId patientId");
};

// Cập nhật dịch vụ
export const updateServiceList = async (id, data) => {
  return await ServiceList.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("doctorId patientId");
};

// Xóa dịch vụ
export const deleteServiceList = async (id) => {
  return await ServiceList.findByIdAndDelete(id);
};
