import LabTest from '../models/LabTest.js';

export const createLabTest = async (labTestData) => {
    const labTest = new LabTest(labTestData);
    return await labTest.save();
};

export const getListLabTests = async () => {
    return await LabTest.find()
        .populate('technician');
};

export const getOneLabTestById = async (id) => {
    return await LabTest.findById(id)
        .populate('technician');
};

export const updateLabTestById = async (id, updateData) => {
    return await LabTest.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteLabTestById = async (id) => {
    return await LabTest.findByIdAndDelete(id);
};
