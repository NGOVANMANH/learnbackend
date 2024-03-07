import express from "express";
import { UserController } from "../controllers/index.js";

const router = express.Router();

router.post("/create", UserController.create)

router.get("/getAll", UserController.getAll)

router.patch("/update", UserController.update)

router.get("/:id", UserController.getById)

export default router;
