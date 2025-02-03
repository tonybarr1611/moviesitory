import { IUser } from "../models/user.model";
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

export class UserService {
  async logIn(email: string, password: string) {
    return await userRepository.logIn(email, password);
  }

  async register(data: IUser) {
    return await userRepository.register(data);
  }
}
