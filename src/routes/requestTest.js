import express from "express";
import {
  createRequestTestController,
  getListRequestTestsController,
  getOneRequestTestByIdController,
  updateRequestTestByIdController,
  deleteRequestTestByIdController,
} from "../controllers/requestTestController.js";

const router = express.Router();

router.post("/", createRequestTestController);

router.get("/", getListRequestTestsController);

router.get("/:id", getOneRequestTestByIdController);

router.put("/:id", updateRequestTestByIdController);

router.delete("/:id", deleteRequestTestByIdController);

export default router;
