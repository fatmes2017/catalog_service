import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import {randNumber } from "@ngneat/falso";
export class CatalogRepository implements ICatalogRepository{

    create(data: Product): Promise<Product> {
             const mockProduct =  {
             
               ...data,
               id:randNumber({ min: 10, max: 1000 })
            }  as Product;
            return Promise.resolve(mockProduct);
      };
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
   
    
}