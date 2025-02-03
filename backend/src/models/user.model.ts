import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  admin: boolean;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
  },
  { collection: "User" }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
export type { IUser };
