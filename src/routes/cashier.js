import express from "express";
import {
  createInvoiceController,
  updateInvoiceStatusController,
  createCashierController,
  getListCashiersController,
  getOneCashierByIdController,
  updateCashierByIdController,
  deleteCashierByIdController,
} from "../controllers/cashierController.js";
const routerCashier = express.Router();

routerCashier.post("/", createCashierController);

routerCashier.get("/", getListCashiersController);

routerCashier.get("/:id", getOneCashierByIdController);

routerCashier.put("/:id", updateCashierByIdController);

routerCashier.delete("/:id", deleteCashierByIdController);

routerCashier.post("/create-invoice", createInvoiceController);

routerCashier.patch("/update-invoice-status", updateInvoiceStatusController);
export default routerCashier;
