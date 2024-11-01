import {
    createClinics,
    listClinics,
    getClinicById,
    updateClinic,
    deleteClinic
} from '../services/clinicServices.js';

// Tạo một clinic mới
export const createClinicController = async (req, res) => {
    try {
        const clinic = await createClinics(req.body);
        res.status(200).json(clinic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy danh sách clinics
export const listClinicsController = async (req, res) => {
    try {
        const clinics = await listClinics();
        res.status(200).json(clinics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết một clinic
export const getClinicByIdController = async (req, res) => {
    try {
        const clinic = await getClinicById(req.params.id);
        res.status(200).json(clinic);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin clinic
export const updateClinicController = async (req, res) => {
    try {
        const clinic = await updateClinic(req.params.id, req.body);
        res.status(200).json(clinic);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa clinic
export const deleteClinicController = async (req, res) => {
    try {
        await deleteClinic(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
