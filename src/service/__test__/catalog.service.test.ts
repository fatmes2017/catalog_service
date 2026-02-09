//import { faker } from "@faker-js/faker";
import { ICatalogRepository } from "../../interface/catalogRepository.interface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";

const mockProduct = (rest: any) => {
  return {
    name: "onion", //faker.commerce.productName(),
    description: "vegetables", //faker.commerce.productDescription(),
    stock: 20, // faker.number.int({min:10,max:100}),
    ...rest,
  };
};

describe("catalogService", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    let repository = new MockCatalogRepository();
  });

  afterEach(() => {
      repository = {} as MockCatalogRepository;
    });


  describe("createProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: 10, //+faker.commerce.price(),
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

  
    // test("should throw error with product already exist", () => {
    //   expect("iphone").toMatch("iphone");
    // });
  });
});
