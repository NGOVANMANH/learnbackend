import express from "express";
import { AuthController } from "../controllers/index.js";

const router = express.Router();

router.post(
    "/register",
    AuthController.register
)

router.post(
    "/login",
    AuthController.login
)

router.get(
    "/verify-email",
    AuthController.verifyEmail
)

router.post(
    "/refresh-token",
    AuthController.refreshToken
)

export default router;
