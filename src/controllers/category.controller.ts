import { Request, Response } from "express";
import { categoryService } from "../services";

class CategoryController {
  create = async (req: Request, res: Response) => {
    const category = await categoryService.create(req.body);
    return res.status(201).json(category);
  };

  list = async (req: Request, res: Response) => {
    const categories = await categoryService.list();
    return res.status(200).json(categories);
  };

  retrieve = async (req: Request, res: Response) => {
    const categoryId = req.params.id;
    const categoryProperty = await categoryService.retrieve(categoryId);
    return res.status(200).json(categoryProperty);
  };
}

export default new CategoryController();
