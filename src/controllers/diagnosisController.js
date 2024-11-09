import {
    createDiagnosis,
    listDiagnosis,
    getDiagnosisById,
    updateDiagnosis,
    deleteDiagnosis
  } from '../services/diagnosisService.js';
  
  // Tạo một diagnosis mới
  export const createDiagnosisController = async (req, res) => {
    try {
      const diagnosis = await createDiagnosis(req.body);
      res.status(201).json(diagnosis);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Lấy danh sách diagnosis
  export const listDiagnosisController = async (req, res) => {
    try {
      const diagnoses = await listDiagnosis();
      res.status(200).json(diagnoses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Lấy chi tiết một diagnosis
  export const getDiagnosisByIdController = async (req, res) => {
    try {
      const diagnosis = await getDiagnosisById(req.params.id);
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  // Cập nhật thông tin diagnosis
  export const updateDiagnosisController = async (req, res) => {
    try {
      const diagnosis = await updateDiagnosis(req.params.id, req.body);
      res.status(200).json(diagnosis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Xóa diagnosis
  export const deleteDiagnosisController = async (req, res) => {
    try {
      await deleteDiagnosis(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };