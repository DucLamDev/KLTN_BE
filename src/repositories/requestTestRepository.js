import RequestTest from '../models/RequestTest.js';

export const createRequestTest = async (requestTestData) => {
    const requestTest = new RequestTest(requestTestData);
    return await requestTest.save();
};

export const getListRequestTests = async () => {
    return await RequestTest.find()
        .populate('patientId')
        .populate('doctorId');
};

export const getOneRequestTestById = async (id) => {
    return await RequestTest.findById(id)
        .populate('patientId')
        .populate('doctorId');
};

export const updateRequestTestById = async (id, updateData) => {
    return await RequestTest.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteRequestTestById = async (id) => {
    return await RequestTest.findByIdAndDelete(id);
};
