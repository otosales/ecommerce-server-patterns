import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Role } from "../utils/roles";

const router = Router();

// Somente ADMIN pode criar, atualizar e excluir produtos
router.post("/", authMiddleware([Role.ADMIN]), ProductController.create);
router.put("/:id", authMiddleware([Role.ADMIN]), ProductController.update);
router.delete("/:id", authMiddleware([Role.ADMIN]), ProductController.delete);

// Qualquer usuário pode listar ou buscar produtos
router.get("/", ProductController.list);
router.get("/:id", ProductController.get);

export default router;