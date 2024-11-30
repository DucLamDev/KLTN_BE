import {
  createInvoice,
  getListInvoices,
  getOneInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
} from "../repositories/invoiceRepository.js";

export const createInvoiceService = async (technicianData) => {
  return await createInvoice(technicianData);
};

export const getListInvoicesService = async () => {
  return await getListInvoices();
};

export const getInvoiceByIdService = async (id) => {
  const technician = await getOneInvoiceById(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};

export const updateInvoiceService = async (id, updateData) => {
  const technician = await updateInvoiceById(id, updateData);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};

export const deleteInvoiceService = async (id) => {
  const technician = await deleteInvoiceById(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
