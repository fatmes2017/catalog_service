import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from '@faker-js/faker';


const mockProduct = (rest: any) => {
  return {
    name: "piyaz",
    description: "vegetables", //faker.commerce.productDescription(),
    stock: 20, // faker.number.int({min:10,max:100}),
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
  //let repository = new MockCatalogRepository();
  // beforeEach(() => {
  //   let repository = new MockCatalogRepository();
  // });
  let repository: MockCatalogRepository = prepareRepo();

  // afterEach(() => {
  //   repository = {} as MockCatalogRepository;
  // });

  describe("CreateProduct", () => {
    test("should create product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: 10, //+faker.commerce.price(),
      });

      const result = await service.createProduct(reqBody);

      expect(result).toMatchObject({
        // id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
      //  expect(result.name).toBe("farzad");
    });

    // test("should throw error with product already exist", async () => {
    //   const service = new CatalogService(repository);
    //   const reqBody = mockProduct({
    //     price: 10, //+faker.commerce.price(),
    //   });
    //   jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product));
    //   await expect(service.createProduct(reqBody)).rejects.toThrow(
    //     "unable to create product",
    //   );
    // });

    purgeRepo(repository);
  });
});
