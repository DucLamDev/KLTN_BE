import {
    createLabTests,
    listLabTests,
    getLabTestById,
    updateLabTest,
    deleteLabTest
} from '../services/labTestServices.js';

// Tạo một lab test mới
export const createLabTestController = async (req, res) => {
    try {
        const labTest = await createLabTests(req.body);
        res.status(200).json(labTest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy danh sách lab tests
export const listLabTestsController = async (req, res) => {
    try {
        const labTests = await listLabTests();
        res.status(200).json(labTests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết một lab test
export const getLabTestByIdController = async (req, res) => {
    try {
        const labTest = await getLabTestById(req.params.id);
        res.status(200).json(labTest);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Cập nhật thông tin lab test
export const updateLabTestController = async (req, res) => {
    try {
        const labTest = await updateLabTest(req.params.id, req.body);
        res.status(200).json(labTest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa lab test
export const deleteLabTestController = async (req, res) => {
    try {
        await deleteLabTest(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
