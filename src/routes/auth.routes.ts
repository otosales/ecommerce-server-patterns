import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login); // chama direto pela classe
router.post("/request-password-reset", AuthController.requestPasswordReset);
router.post("/reset-password", AuthController.resetPassword);
router.post("/register", AuthController.register);

export default router;