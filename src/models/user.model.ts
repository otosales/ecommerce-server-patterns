// src/models/user.model.ts
import { Schema, model } from "mongoose";
import { Role } from "../utils/roles";

export interface IUser {
  name?: string;
  email: string;
  password: string;
  role: Role;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.USER },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
});

export const User = model<IUser>("User", userSchema);