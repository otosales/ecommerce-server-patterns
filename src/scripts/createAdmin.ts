import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri!)
  .then(async () => {
    console.log("Conexão com MongoDB realizada com sucesso");

    const adminExists = await User.findOne({ email: "admin@admin.com" });
    if (adminExists) {
      console.log("Admin já existe");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Administrador",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin criado com sucesso");
    process.exit(0);
  })
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));