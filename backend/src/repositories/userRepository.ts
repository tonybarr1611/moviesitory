import User, { IUser } from "../models/user.model";
import { PasswordHasher } from "../utils/passwordHash";

User.countDocuments({});

export class UserRepository {
  hasher = new PasswordHasher();

  async logIn(email: string, password: string) {
    const user = await User.findOne({ email: email });
    if (user && (await this.hasher.validatePassword(password, user.password))) {
      return { valid: true, admin: user.admin };
    }
    return { valid: false, admin: false };
  }

  async register(data: IUser) {
    data.password = await this.hasher.hashPassword(data.password);
    return await User.create(data);
  }
}
