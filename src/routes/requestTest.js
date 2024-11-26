import express from "express";
import {
  createRequestTestController,
  getListRequestTestsController,
  getOneRequestTestByIdController,
  updateRequestTestByIdController,
  deleteRequestTestByIdController,
  checkRequestTestController,
} from "../controllers/requestTestController.js";

const router = express.Router();

router.post("/", createRequestTestController);

router.get("/", getListRequestTestsController);

router.get("/check", checkRequestTestController);

router.get("/:id", getOneRequestTestByIdController);

router.put("/:id", updateRequestTestByIdController);

router.delete("/:id", deleteRequestTestByIdController);

export default router;
