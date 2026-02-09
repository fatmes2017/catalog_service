import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";


export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
   
    this._repository = repository;
  }

  async createProduct(input: Product) {
   
       const data = await this._repository?.create(input);
    return data;
   
   
  }
  async updateProduct(input: any) {}
  async getProducts(limit: number, offset: number) {}
  async getProduct(id: number) {}
  async deleteProduct(id: number) {}
}
