import Diagnosis from '../models/Diagnosis';

class DiagnosisRepository {
  async createDiagnosis(diagnosisData) {
    const diagnosis = new Diagnosis(diagnosisData);
    await diagnosis.save();
    return diagnosis;
  }

  async getDiagnosisById(id) {
    const diagnosis = await Diagnosis.findById(id);
    return diagnosis;
  }

  async getAllDiagnosis() {
    const diagnoses = await Diagnosis.find();
    return diagnoses;
  }

  async updateDiagnosis(id, diagnosisData) {
    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(id, diagnosisData, { new: true });
    return updatedDiagnosis;
  }

  async deleteDiagnosis(id) {
    await Diagnosis.findByIdAndDelete(id);
  }
}

export default DiagnosisRepository;