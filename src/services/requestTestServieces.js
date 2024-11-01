import {
    createRequestTest,
    getListRequestTests,
    getOneRequestTestById,
    updateRequestTestById,
    deleteRequestTestById
} from '../repositories/requestTestRepository.js';

export const createRequestTests = async (requestTestData) => {
    return await createRequestTest(requestTestData);
};

export const listRequestTests = async () => {
    return await getListRequestTests();
};

export const getRequestTestById = async (id) => {
    const requestTest = await getOneRequestTestById(id);
    if (!requestTest) throw new Error("Request Test not found");
    return requestTest;
};

export const updateRequestTest = async (id, updateData) => {
    const requestTest = await updateRequestTestById(id, updateData);
    if (!requestTest) throw new Error("Request Test not found");
    return requestTest;
};

export const deleteRequestTest = async (id) => {
    const requestTest = await deleteRequestTestById(id);
    if (!requestTest) throw new Error("Request Test not found");
    return requestTest;
};
