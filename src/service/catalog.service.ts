import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

  private _repository: ICatalogRepository;
  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }
 async createProduct(input: any) {
  const data=this._repository.create(input);
  return data;
 }
 async updateProduct(input: any) {}
 async getProducts(limit: number, offset: number) {}
 async getProduct(id: number) {}
 async deleteProduct(id: number) {}
}
;