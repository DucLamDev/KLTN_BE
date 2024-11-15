import express from "express";
import {
  createReceptionistController,
  getListReceptionistsController,
  getOneReceptionistByIdController,
  updateReceptionistByIdController,
  deleteReceptionistByIdController,
} from "../controllers/receptionistController.js";

const router = express.Router();

router.post("/", createReceptionistController);

router.get("/", getListReceptionistsController);

router.get("/:id", getOneReceptionistByIdController);

router.put("/:id", updateReceptionistByIdController);

router.delete("/:id", deleteReceptionistByIdController);

export default router;
