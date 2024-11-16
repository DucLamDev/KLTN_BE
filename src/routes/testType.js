import express from "express";
import {
  createTestTypeController,
  getListTestTypesController,
  getOneTestTypeByIdController,
  updateTestTypeByIdController,
  deleteTestTypeByIdController,
} from "../controllers/testTypeController.js";

const router = express.Router();

router.post("/", createTestTypeController);

router.get("/", getListTestTypesController);

router.get("/:id", getOneTestTypeByIdController);

router.put("/:id", updateTestTypeByIdController);

router.delete("/:id", deleteTestTypeByIdController);

export default router;
