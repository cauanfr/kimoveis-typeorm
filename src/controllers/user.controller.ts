import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  create = async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  };

  list = async (req: Request, res: Response) => {
    const users = await userService.list();
    return res.status(200).json(users);
  };

  update = async (req: Request, res: Response) => {
    const user = await userService.update(req.body, req.foundUser);
    return res.status(200).json(user);
  };

  delete = async (req: Request, res: Response) => {
    await userService.delete(req.foundUser);
    return res.status(204).json();
  };
}

export default new UserController();
