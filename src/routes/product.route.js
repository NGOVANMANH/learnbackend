import express from "express";
import { ProductController } from "../controllers/index.js";

const router = express.Router();

router.patch("/:id", ProductController.update)

router.get("/:id", ProductController.getById)

router.post("/", ProductController.create)

router.get("/", ProductController.getAll)

export default router;
