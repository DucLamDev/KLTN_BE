import express from "express";
import {
  createAdminController,
  getListAdminsController,
  getOneAdminByIdController,
  updateAdminByIdController,
  deleteAdminByIdController,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/", createAdminController);

router.get("/", getListAdminsController);

router.get("/:id", getOneAdminByIdController);

router.put("/:id", updateAdminByIdController);

router.delete("/:id", deleteAdminByIdController);

export default router;
