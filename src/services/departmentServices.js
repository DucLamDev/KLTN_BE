import {
    createDepartment,
    getListDepartments,
    getOneDepartmentById,
    updateDepartmentById,
    deleteDepartmentById
} from '../repositories/departmentRepository.js';

export const createDepartments = async (departmentData) => {
    return await createDepartment(departmentData);
};

export const listDepartments = async () => {
    return await getListDepartments();
};

export const getDepartmentById = async (id) => {
    const department = await getOneDepartmentById(id);
    if (!department) throw new Error("Department not found");
    return department;
};

export const updateDepartment = async (id, updateData) => {
    const department = await updateDepartmentById(id, updateData);
    if (!department) throw new Error("Department not found");
    return department;
};

export const deleteDepartment = async (id) => {
    const department = await deleteDepartmentById(id);
    if (!department) throw new Error("Department not found");
    return department;
};
