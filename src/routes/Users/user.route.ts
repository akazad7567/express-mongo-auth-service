import express from "express";
import { Request, Response } from "express";
import { User } from "../../services/user.service";
export const userRoutes = express.Router();

const userHandler = User.getInstance();
userRoutes.get("/health", async (req: Request, res: Response) => {
  try {
    const data = await userHandler.healthCheck();
    res.ok(data);
  } catch (error) {
    res.badRequest({ message: error });
  }
});
userRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const data = await userHandler.signup(name, email, password);
    res.ok({ data });
  } catch (error) {

    res.badRequest({ message: error });
  }
});
userRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await userHandler.login(email, password);
    res.ok({ token });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
userRoutes.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const data = await userHandler.resetPassword(email);
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
userRoutes.patch("/reset-confirm", async (req: Request, res: Response) => {
  try {
    const { email, password, code } = req.body;
    const data = await userHandler.confirmResetPassword(email, password, code);
    res.ok({ data });
  } catch (error) {
    res.badRequest({ message: error });
  }
});
