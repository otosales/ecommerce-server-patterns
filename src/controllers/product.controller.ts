import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const service = new ProductService();

export class ProductController {
  static async create(req: Request, res: Response) {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  }

  static async list(req: Request, res: Response) {
    const products = await service.getAllProducts();
    res.json(products);
  }

  static async get(req: Request, res: Response) {
    const product = await service.getProductById(req.params.id);
    res.json(product);
  }

  static async update(req: Request, res: Response) {
    const product = await service.updateProduct(req.params.id, req.body);
    res.json(product);
  }

  static async delete(req: Request, res: Response) {
    await service.deleteProduct(req.params.id);
    res.status(204).send();
  }
}