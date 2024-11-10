import DiagnosisRepository from '../repositories/diagnosisRepository';

class DiagnosisService {
  constructor() {
    this.diagnosisRepository = new DiagnosisRepository();
  }

  async createDiagnosis(diagnosisData) {
    return this.diagnosisRepository.createDiagnosis(diagnosisData);
  }

  async getDiagnosisById(id) {
    return this.diagnosisRepository.getDiagnosisById(id);
  }

  async getAllDiagnosis() {
    return this.diagnosisRepository.getAllDiagnosis();
  }

  async updateDiagnosis(id, diagnosisData) {
    return this.diagnosisRepository.updateDiagnosis(id, diagnosisData);
  }

  async deleteDiagnosis(id) {
    return this.diagnosisRepository.deleteDiagnosis(id);
  }
}

export default DiagnosisService;