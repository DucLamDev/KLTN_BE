import express from "express";
import {
  createTestController,
  getListTestsController,
  getOneTestByIdController,
  updateTestByIdController,
  deleteTestByIdController,
  checkTestController,
} from "../controllers/testController.js";

const routerTest = express.Router();

routerTest.post("/", createTestController);

// Không truyền query thì get all
// Truyền query (patientId & doctorId) thì get one
routerTest.get("/", getListTestsController);

routerTest.get("/check", checkTestController);

routerTest.get("/:id", getOneTestByIdController);

routerTest.put("/:id", updateTestByIdController);

routerTest.delete("/:id", deleteTestByIdController);

export default routerTest;
