import dotenv from "dotenv";
dotenv.config(); // Deve vir antes de qualquer uso de process.env

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());

// Lê variáveis do .env
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

// Conecta no MongoDB
mongoose.connect(mongoUri!)
  .then(() => console.log("Conexão com MongoDB realizada com sucesso"))
  .catch((err: any) => console.error("Erro ao conectar no MongoDB:", err));

// Rotas
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
console.log("Rotas de produtos registradas ✅");

// Servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

console.log("Mongo URI:", process.env.MONGO_URI);