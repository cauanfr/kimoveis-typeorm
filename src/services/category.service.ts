import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Category } from "../entities/category.entity";
import { Property } from "../entities/property.entity";
import { AppError } from "../errors";
import { ICategoryRequest } from "../interfaces/categories";

class CategoryService {
  private categoryRepo: Repository<Category>;

  constructor() {
    this.categoryRepo = AppDataSource.getRepository(Category);
  }

  create = async (payload: ICategoryRequest): Promise<Category> => {
    const foundCategory = await this.categoryRepo.findOneBy({
      name: payload.name,
    });

    if (foundCategory) {
      throw new AppError(400, "Category already exists.");
    }

    const category = this.categoryRepo.create(payload);
    await this.categoryRepo.save(category);

    return category;
  };

  retrieve = async (): Promise<Category[]> => this.categoryRepo.find();

  retrieveProperty = async (categoryId: string): Promise<Category> => {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      relations: { properties: true },
    });

    if (!category) {
      throw new AppError(404, "Category not found.");
    }

    return category;
  };
}

export default new CategoryService();
