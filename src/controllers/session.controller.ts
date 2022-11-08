import { Request, Response } from "express";
import { sessionService } from "../services";

class SessionController {
  login = async (req: Request, res: Response) => {
    const token: string = await sessionService.login(req.body);

    return res.status(200).json({ token });
  };
}

export default new SessionController();
