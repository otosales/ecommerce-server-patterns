// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../utils/mail"; // função que envia e-mail

dotenv.config();

export class AuthController {
  // REGISTER
  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "E-mail já cadastrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "user"
      });

      await user.save();

      return res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // LOGIN
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: "Senha incorreta" });

      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "segredo",
        { expiresIn: "1h" }
      );

      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // REQUISITAR RESET DE SENHA
  static async requestPasswordReset(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Gera token forte e define expiração em 1 hora
      const token = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
      await user.save();

      // Envia e-mail com link para redefinir senha
      await sendResetPasswordEmail(user.email, token);

      return res.json({ message: "E-mail enviado com link para redefinir senha" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  // RESETAR SENHA
  static async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token e nova senha são necessários" });
    }

    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() }
      });

      if (!user) {
        return res.status(400).json({ message: "Token inválido ou expirado" });
      }

      // Evitar que a senha seja a mesma da anterior
      const same = await bcrypt.compare(newPassword, user.password);
      if (same) {
        return res.status(400).json({ message: "A nova senha deve ser diferente da anterior" });
      }

      // Atualiza a senha e limpa token/expiração
      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();

      return res.json({ message: "Senha redefinida com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
