// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // pega o valor depois do "Bearer"
    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    try {
      // 🔑 aqui usamos o mesmo segredo definido no .env
      const secret = process.env.JWT_SECRET || "segredo";
      const decoded = jwt.verify(token, secret) as any;

      // se roles foram passados, confere se o usuário tem a role necessária
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Usuário não autorizado" });
      }

      // injeta os dados do usuário no request (útil nos controllers)
      (req as any).user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
};