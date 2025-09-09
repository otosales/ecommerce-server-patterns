// src/models/product.model.ts
import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  description?: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});

export const Product = model<IProduct>("Product", productSchema);