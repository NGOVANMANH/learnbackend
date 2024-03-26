import express from "express";
import { UserController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js"

const router = express.Router();

router.get(
    "/:id",
    authenticate,
    UserController.findById
)

router.patch(
    "/:id",
    authenticate,
    UserController.update
)

router.get(
    "/",
    authenticate,
    UserController.get
)

router.post(
    "/",
    authenticate,
    UserController.create
)

export default router;
