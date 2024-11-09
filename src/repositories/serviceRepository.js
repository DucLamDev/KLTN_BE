import Services from "../models/serviceModel";

// Tạo dịch vụ mới
export const createService = async (data) => {
    const service = new Services(data);
    return await service.save();
};

// Lấy tất cả dịch vụ
export const getAllServices = async () => {
    return await Services.find();
};

// Lấy dịch vụ theo ID
export const getServiceById = async (id) => {
    return await Services.findById(id);
};

// Cập nhật dịch vụ
export const updateService = async (id, data) => {
    return await Services.findByIdAndUpdate(id, data, { new: true });
};

// Xóa dịch vụ
export const deleteService = async (id) => {
    return await Services.findByIdAndDelete(id);
};
