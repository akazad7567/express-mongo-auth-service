import jsonwebtoken from "jsonwebtoken";
import { Request, Response } from "express";
const { verify } = jsonwebtoken;

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  try {
    const { token } = req.headers;
    const decoded = verify(token, "secret");

    if (!decoded.userInfo) {
      throw {
        message: "Token missing in headers or Invalid token",
      };
    }

    console.log(decoded);
    const { Id } = decoded.userInfo;
    req.headers.userId = Id;
    return next();
  } catch (e) {
    res.unauthorized(e);
  }
};
