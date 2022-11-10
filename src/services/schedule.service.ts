import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Schedule } from "../entities/schedule.entity";
import { AppError } from "../errors";
import { ISchedule, IScheduleRequest } from "../interfaces/schedules";
import propertyService from "./property.service";
import userService from "./user.service";

class ScheduleService {
  private scheduleRepo: Repository<Schedule>;

  constructor() {
    this.scheduleRepo = AppDataSource.getRepository(Schedule);
  }

  validateDateHour = ({ date, hour }: ISchedule): void => {
    const dateHour = new Date(`${date} ${hour}`);
    const satSun = [0, 6];
    const dtDay = dateHour.getDay();

    if (satSun.includes(dtDay)) {
      throw new AppError(400, "Schedule available on monday to friday.");
    }

    if (hour > "18:00" || hour < "08:00") {
      throw new AppError(400, "Schedule available between 8am and 6pm.");
    }
  };

  create = async ({ propertyId, userId, ...payload }: IScheduleRequest) => {
    this.validateDateHour({ ...payload });
    const property = await propertyService.retrieve(propertyId);
    const user = await userService.retrieve(userId);

    const foundSchedule = await this.scheduleRepo.findOne({
      where: {
        date: payload.date,
        hour: payload.hour,
      },
    });

    if (foundSchedule) {
      throw new AppError(400, "This date and hour is already taken.");
    }

    const schedule = this.scheduleRepo.create({
      ...payload,
      property,
      user,
    });

    await this.scheduleRepo.save(schedule);

    return schedule;
  };

  retrieveByProperty = async (propertyId: string): Promise<Schedule[]> => {
    const foundByPropertyId = await this.scheduleRepo.find({
      where: {
        property: {
          id: propertyId,
        },
      },
      relations: {
        property: true,
      },
    });

    if (!foundByPropertyId.length) {
      throw new AppError(404, "No schedules found.");
    }

    return foundByPropertyId;
  };
}

export default new ScheduleService();
