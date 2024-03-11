import express from "express";
import { ProductController } from "../controllers/index.js";

const router = express.Router();

router.post("/create", ProductController.create)

router.get("/getAll", ProductController.getAll)

router.patch("/update", ProductController.update)

router.get("/:id", ProductController.getById)

export default router;
