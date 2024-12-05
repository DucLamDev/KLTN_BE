import express from "express";
import {
  createInvoiceController,
  getInvoiceByIdController,
  deleteInvoiceController,
  getListInvoicesController,
  updateInvoiceController,
} from "../controllers/invoiceController.js";

const routerInvoice = express.Router();

routerInvoice.post("/", createInvoiceController);

routerInvoice.get("/", getListInvoicesController);

routerInvoice.get("/:id", getInvoiceByIdController);

routerInvoice.patch("/:id", updateInvoiceController);

routerInvoice.delete("/:id", deleteInvoiceController);

export default routerInvoice;
