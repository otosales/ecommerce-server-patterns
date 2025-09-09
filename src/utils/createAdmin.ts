import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { connectDB } from "../config/database";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  await connectDB(process.env.MONGO_URI!);

  const email = "admin@ecommerce.com";
  const password = "Admin123!";

  // Verifica se já existe
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin já existe");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    email,
    password: hashedPassword,
    role: "admin",
  });

  await admin.save();
  console.log("Admin criado com sucesso!");
  process.exit(0);
};

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});