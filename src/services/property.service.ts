import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { Category } from "../entities/category.entity";
import { Property } from "../entities/property.entity";
import { AppError } from "../errors";
import { IPropertyRequest } from "../interfaces/properties";
import addressService from "./address.service";

class PropertyService {
  private propertyRepo: Repository<Property>;
  private categoryRepo: Repository<Category>;

  constructor() {
    this.propertyRepo = AppDataSource.getRepository(Property);
    this.categoryRepo = AppDataSource.getRepository(Category);
  }

  create = async ({
    address,
    categoryId,
    ...payload
  }: IPropertyRequest): Promise<Property> => {
    const newAddress: Address = await addressService.create(address);
    const category = await this.categoryRepo.findOneBy({ id: categoryId });

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

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
