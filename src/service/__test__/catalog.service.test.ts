import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import {
  randProductName,
  randCatchPhrase,
  randAmount,
  randNumber,
} from "@ngneat/falso";
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
  .attr("id", randNumber({ min: 10, max: 1000 }))
  .attr("name", randProductName())
  .attr("description", randCatchPhrase())
  .attr("stock", randNumber())
  .attr("price", randAmount());

const mockProduct = (rest: any) => {
  return {
    name: randProductName(),
    description: randCatchPhrase(), //faker.commerce.productDescription(),
    stock: randNumber(), // faker.number.int({min:10,max:100}),
    ...rest,
  };
};

//create this function as beforeEach
const prepareRepo = (): MockCatalogRepository => {
  return new MockCatalogRepository();
};
//create this function as afterEach
const purgeRepo = (repository: MockCatalogRepository) => {
  repository = {} as MockCatalogRepository;
};

describe("catalogService", () => {
  let repository: MockCatalogRepository = prepareRepo();

  // afterEach(() => {
  //   repository = {} as MockCatalogRepository;
  // });

  describe("CreateProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: randAmount(), //+faker.commerce.price(),
      });
      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should throw error with unable to create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: randAmount(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "unable to create product",
      );
    });

    test("should throw error with Product is already exists", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: randAmount(),
      });
      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("Product is already exists")),
        );

      await expect(service.createProduct(reqBody)).rejects.toThrow(
        "Product is already exists",
      );
    });
  });

  describe("UpdateProduct", () => {
    test("should update product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: randAmount(), //+faker.commerce.price(),
        id: randNumber({ min: 10, max: 1000 }),
      });
      const result = await service.updateProduct(reqBody);

      expect(result).toMatchObject(reqBody);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "update")
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.updateProduct({})).rejects.toThrow(
        "product does not exist",
      );
    });
  });

  describe("getProducts", () => {
    test("should get products by limit and offset", async () => {
      const service = new CatalogService(repository);

      const limit = randNumber({ min: 10, max: 1000 });
      const products = productFactory.buildList(limit);
      
      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() => Promise.resolve(products));
      const result = await service.getProducts(limit, 0);

      expect(result.length).toEqual(limit);
      expect(result).toMatchObject(products);
    });

    test("should throw error with products does not exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository, "find")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("products does not exist")),
        );

      await expect(service.getProducts(0, 0)).rejects.toThrow(
        "products does not exist",
      );
    });
  });

  describe("getProduct", () => {
    test("should get products by id", async () => {
      const service = new CatalogService(repository);

      const id = randNumber({ min: 10, max: 1000 });
      const product = productFactory.build();
      
      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() => Promise.resolve(product));
      const result = await service.getProduct(id);

      expect(result).toMatchObject(product);
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      const id = randNumber({ min: 10, max: 1000 });
      jest
        .spyOn(repository, "findOne")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist")),
        );

      await expect(service.getProduct(id)).rejects.toThrow(
        "product does not exist",
      );
    });
  });

  describe("delete Product", () => {
    test("should delete products by id", async () => {
      const service = new CatalogService(repository);

     
      const product = productFactory.build();
      const id=product.id;
      jest
        .spyOn(repository, 'delete')
        .mockImplementationOnce(() => Promise.resolve({id:product.id}));
      const result = await service.deleteProduct(product.id!);
 
      expect(result).toMatchObject({
        id:product.id
      });
    });

    test("should throw error with product does not exist", async () => {
      const service = new CatalogService(repository);
      const id = randNumber({ min: 10, max: 1000 });
      jest
        .spyOn(repository, 'delete')
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product does not exist")),
        );

      await expect(service.deleteProduct(id)).rejects.toThrow(
        "product does not exist",
      );
    });
  });


  purgeRepo(repository);
});
