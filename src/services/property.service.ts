import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { Category } from "../entities/category.entity";
import { Property } from "../entities/property.entity";
import { AppError } from "../errors";
import { IPropertyRequest } from "../interfaces/properties";
import addressService from "./address.service";
import categoryService from "./category.service";

class PropertyService {
  private propertyRepo: Repository<Property>;

  constructor() {
    this.propertyRepo = AppDataSource.getRepository(Property);
  }

  create = async ({
    address,
    categoryId,
    ...payload
  }: IPropertyRequest): Promise<Property> => {
    const newAddress: Address = await addressService.create(address);
    const category: Category = await categoryService.retrieveProperty(
      categoryId
    );

    const property = this.propertyRepo.create({
      ...payload,
      address: newAddress,
      category: category,
      sold: false,
    });
    await this.propertyRepo.save(property);

    return property;
  };

  retrieve = async (): Promise<Property[]> => this.propertyRepo.find();
}

export default new PropertyService();
