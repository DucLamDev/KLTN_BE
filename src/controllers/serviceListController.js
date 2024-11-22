import ServiceList from '../models/ServiceList.js';

// Tạo một service list mới
export const createServiceList = async (req, res) => {
    try {
        const serviceList = new ServiceList(req.body);
        await serviceList.save();
        res.status(201).json(serviceList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy danh sách tất cả các service list
export const getAllServiceLists = async (req, res) => {
    try {
        const serviceLists = await ServiceList.find().populate('doctorId patientId');
        res.status(200).json(serviceLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết một service list 
export const getServiceListById = async (req, res) => {
    try {
        const serviceList = await ServiceList.findById(req.params.id).populate('doctorId patientId');
        if (!serviceList) {
            return res.status(404).json({ message: 'Service list not found' });
        }
        res.status(200).json(serviceList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin của một service list
export const updateServiceList = async (req, res) => {
    try {
        const updatedServiceList = await ServiceList.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('doctorId patientId');
        if (!updatedServiceList) {
            return res.status(404).json({ message: 'Service list not found' });
        }
        res.status(200).json(updatedServiceList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một service list
export const deleteServiceList = async (req, res) => {
    try {
        await ServiceList.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};