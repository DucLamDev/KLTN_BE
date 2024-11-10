import * as serviceService from "../services/serviceService";

// Tạo dịch vụ mới
export const createService = async (req, res) => {
    try {
        const data = req.body;
        const service = await serviceService.createService(data);
        return res.status(201).json(service);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

// Lấy tất cả dịch vụ
export const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

// Lấy dịch vụ theo ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await serviceService.getServiceById(id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

// Cập nhật dịch vụ
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedService = await serviceService.updateService(id, data);
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json(updatedService);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};

// Xóa dịch vụ
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await serviceService.deleteService(id);
        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};
