import express from "express";
import {
  createTestController,
  getListTestsController,
  getOneTestByIdController,
  updateTestByIdController,
  deleteTestByIdController,
} from "../controllers/testController.js";

const routerTest = express.Router();

routerTest.post("/", createTestController);

routerTest.get("/", getListTestsController);

routerTest.get("/:id", getOneTestByIdController);

routerTest.put("/:id", updateTestByIdController);

routerTest.delete("/:id", deleteTestByIdController);

export default routerTest;
