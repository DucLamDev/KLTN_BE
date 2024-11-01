import {
    createLabTest,
    getListLabTests,
    getOneLabTestById,
    updateLabTestById,
    deleteLabTestById
} from '../repositories/labTestRepository.js';

export const createLabTests = async (labTestData) => {
    return await createLabTest(labTestData);
};

export const listLabTests = async () => {
    return await getListLabTests();
};

export const getLabTestById = async (id) => {
    const labTest = await getOneLabTestById(id);
    if (!labTest) throw new Error("Lab Test not found");
    return labTest;
};

export const updateLabTest = async (id, updateData) => {
    const labTest = await updateLabTestById(id, updateData);
    if (!labTest) throw new Error("Lab Test not found");
    return labTest;
};

export const deleteLabTest = async (id) => {
    const labTest = await deleteLabTestById(id);
    if (!labTest) throw new Error("Lab Test not found");
    return labTest;
};
