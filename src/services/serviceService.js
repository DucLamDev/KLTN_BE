import * as serviceRepository from "../repositories/serviceRepository.js";

// Tạo dịch vụ mới
export const createService = async (data) => {
    return await serviceRepository.createService(data);
};

// Lấy tất cả dịch vụ
export const getAllServices = async () => {
    return await serviceRepository.getAllServices();
};

// Lấy dịch vụ theo ID
export const getServiceById = async (id) => {
    return await serviceRepository.getServiceById(id);
};

// Cập nhật dịch vụ
export const updateService = async (id, data) => {
    return await serviceRepository.updateService(id, data);
};

// Xóa dịch vụ
export const deleteService = async (id) => {
    return await serviceRepository.deleteService(id);
};
