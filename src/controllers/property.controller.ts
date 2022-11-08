import { Request, Response } from "express";
import { propertyService } from "../services";

class PropertyController {
  create = async (req: Request, res: Response) => {
    const property = await propertyService.create(req.body);
    return res.status(201).json(property);
  };

  retrieve = async (req: Request, res: Response) => {
    const properties = await propertyService.retrieve();
    return res.status(200).json(properties);
  };
}

export default new PropertyController();
