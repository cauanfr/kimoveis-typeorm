import { IUserLogin } from "../interfaces/users";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { AppError } from "../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class SessionService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  login = async ({ email, password }: IUserLogin): Promise<string> => {
    const foundUser = await this.userRepo.findOneBy({ email });

    if (!foundUser) {
      throw new AppError(401, "Invalid credentials.");
    }

    const comparePasswords = await compare(password, foundUser.password);

    if (!comparePasswords) {
      throw new AppError(401, "Invalid credentials.");
    }

    const token = sign(
      { isAdm: foundUser.isAdm, email: foundUser.email },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRES_IN, subject: foundUser.id }
    );

    return token;
  };
}

export default new SessionService()
