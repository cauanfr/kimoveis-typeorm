import { JwtPayload } from "jsonwebtoken";
import { User } from "../../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      decoded: JwtPayload;
      foundUser: User;
    }
  }
}

export {};
