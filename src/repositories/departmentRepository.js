import Department from '../models/Department.js';

export const createDepartment = async (departmentData) => {
    const department = new Department(departmentData);
    return await department.save();
};

export const getListDepartments = async () => {
    return await Department.find()
        .populate('head')
        .populate('staff')
        .populate('clinic');
};

export const getOneDepartmentById = async (id) => {
    return await Department.findById(id)
        .populate('head')
        .populate('staff')
        .populate('clinic');
};

export const updateDepartmentById = async (id, updateData) => {
    return await Department.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteDepartmentById = async (id) => {
    return await Department.findByIdAndDelete(id);
};
