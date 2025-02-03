import express from "express";
import { UserController } from "../controllers/userController";

const UserRouter = express.Router();
const userController = new UserController();

UserRouter.post("/login", userController.logIn);
UserRouter.post("/register", userController.register);

export default UserRouter;
