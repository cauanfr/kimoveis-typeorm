import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { IUser, IUserRequest, IUserUpdate } from "../interfaces/users";
import { AppError } from "../errors";
import { hash } from "bcryptjs";

class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  userWOPassword = (user: User): IUser => {
    const { password: undefined, ...woPwd } = user;
    return woPwd;
  };

  usersWOPassword = (users: User[]): IUser[] => {
    return users.map((u) => this.userWOPassword(u));
  };

  cantUpdateFields = (
    recievedFields: Array<string>,
    nonUpdatable: Array<string>
  ): void => {
    for (const field of recievedFields) {
      if (nonUpdatable.includes(field)) {
        throw new AppError(401, `Can't update ${field}.`);
      }
    }
  };

  createUser = async (payload: IUserRequest): Promise<IUser> => {
    const foundUser = await this.userRepo.findOneBy({ email: payload.email });

    if (foundUser) {
      throw new AppError(400, "E-mail already exists.");
    }

    payload.password = await hash(payload.password, 10);

    const user = this.userRepo.create({ ...payload, isActive: true });
    await this.userRepo.save(user);

    return this.userWOPassword(user);
  };

  getUsers = async (): Promise<IUser[]> => {
    const users = await this.userRepo.find();
    return this.usersWOPassword(users);
  };

  updateUser = async (params: IUserUpdate, user: User): Promise<IUser> => {
    this.cantUpdateFields(Object.keys(params), ["id", "isAdm", "isActive"]);
    await this.userRepo.update(user.id, { ...params });

    return this.userWOPassword(user);
  };

  deleteUser = async (user: User): Promise<void> => {
    if (!user.isActive) {
      throw new AppError(400, "User not found.");
    }

    await this.userRepo.update(user.id, { isActive: false });
  };
}

export default new UserService();
