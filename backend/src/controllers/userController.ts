import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  async logIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body; // Use req.body instead of req.params
      res.json(await userService.logIn(email, password));
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      res.json(userService.register(data));
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
