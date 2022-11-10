import { Request, Response } from "express";
import { scheduleService } from "../services";

class ScheduleController {
  create = async (req: Request, res: Response) => {
    req.body.userId = req.decoded.sub;
    const schedule = await scheduleService.create(req.body);

    return res.status(201).json({ message: "created", schedule });
  };
  retrieveByProperty = async (req: Request, res: Response) => {
    const schedules = await scheduleService.retrieveByProperty(req.params.id);
    return res.status(200).json({ schedules });
  };
}

export default new ScheduleController();
