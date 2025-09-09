// src/services/product.service.ts
import { ProductRepository } from "../repositories/product.repository";
import { IProduct } from "../models/product.model";

export class ProductService {
  private repo = new ProductRepository();

  createProduct(product: IProduct) {
    return this.repo.create(product);
  }

  getAllProducts() {
    return this.repo.findAll();
  }

  getProductById(id: string) {
    return this.repo.findById(id);
  }

  updateProduct(id: string, data: Partial<IProduct>) {
    return this.repo.update(id, data);
  }

  deleteProduct(id: string) {
    return this.repo.delete(id);
  }
}