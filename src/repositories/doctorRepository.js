import Doctor from '../models/Doctor.js';

export const createDoctor = async (doctorData) => {
  const doctor = new Doctor(doctorData);
  return await doctor.save();
};

export const getListDoctors = async () => {
  return await Doctor.find().populate('department');
};

export const getOneDoctorById = async (id) => {
  return await Doctor.findById(id)    
};

export const updateDoctorById = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate(id, updateData, { new: true, runValidators: true, });
};

export const deleteDoctorById = async (id) => {
  return await Doctor.findByIdAndDelete(id);
};

export const getSpecializations = async () => {
  return await Doctor.distinct("specialization");
}