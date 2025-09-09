// src/repositories/product.repository.ts
import { Product, IProduct } from "../models/product.model";

export class ProductRepository {
  async create(product: IProduct) {
    return Product.create(product);
  }

  async findAll() {
    return Product.find();
  }

  async findById(id: string) {
    return Product.findById(id);
  }

  async update(id: string, data: Partial<IProduct>) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return Product.findByIdAndDelete(id);
  }
}