import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import {randNumber } from "@ngneat/falso";

export class MockCatalogRepository implements ICatalogRepository{
    
    create(data: Product): Promise<Product> {
           const mockProduct =  {
           
             ...data,
             id:randNumber({ min: 10, max: 1000 })
          }  as Product;
          return Promise.resolve(mockProduct);
    };
    update(data: Product): Promise<Product> {

          return Promise.resolve(data as unknown as Product);
    };
    delete(id: any) {
        return Promise.resolve(id);
    };
    find(limit: number, offset: number): Promise<Product[]> {
         
        return Promise.resolve([]);
    };
    findOne(id: number): Promise<Product> {
        return Promise.resolve({id} as unknown as Product);
    };
   
    
};