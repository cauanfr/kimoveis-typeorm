import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  };

  updateUser = async (req: Request, res: Response) => {
    const user = await userService.updateUser(req.body, req.foundUser);
    return res.status(200).json(user);
  };

  deleteUser = async (req: Request, res: Response) => {
    await userService.deleteUser(req.foundUser);
    return res.status(204).json();
  };
}

export default new UserController();
