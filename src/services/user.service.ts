import { InterfaceUserHandler } from "../interfaces/interface.userHandler";
import { validate } from "../config/validationRules.config";
import { UsersDb } from "./db.services/db.service.user";
import jsonwebtoken from "jsonwebtoken";
import * as cache from "memory-cache";
import bcrypt from "bcrypt";

const { sign, decode, verify } = jsonwebtoken;
const slatRounds = 10;
const UserDb = UsersDb.getInstance();
const generateToken = (userInfo: any) =>
  sign(
    {
      userInfo,
    },
    "secret",
    { expiresIn: "1h" }
  );

const generateHashPassword = async (password: any): Promise<any> => {
  return bcrypt
    .hash(password, slatRounds)
    .then((hash: any) => {
      return hash;
    })
    .catch((error: any) => console.log(error.message));
};

const validateCredentials = async (
  newPass: string,
  prvHashPass: string
): Promise<any> => {
  return bcrypt
    .compare(newPass, prvHashPass)
    .then((res: any) => {
      return res;
    })
    .catch((error: any) => console.log(error.message));
};

export class User implements InterfaceUserHandler {
  private static userInstance: User;
  private constructor() {}
  public static getInstance(): User {
    if (!this.userInstance) {
      this.userInstance = new User();
    }
    return this.userInstance;
  }
  async healthCheck(): Promise<any> {
    return {
      Status: "ok",
      API_SERVER: "Server UP & Running",
    };
  }
  async signup(name: string, email: string, password: string): Promise<any> {
    const data = {
      name,
      email,
      password,
    };
    validate(data, "signup");
    const userExist = await UserDb.doesExist(email);
    if (userExist) {
      throw { message: "Email address already registered" };
    }
    const hashKey = await generateHashPassword(password);
    data.password = hashKey;
    const userInfo = await UserDb.create(data);
    return userInfo;
  }

  async login(email: string, password: string): Promise<any> {
    const data = {
      email,
      password,
    };
    validate(data, "login");
    const userInfo: any = await UserDb.doesExist(email);
    const isAuthorizeUser = await validateCredentials(
      password,
      userInfo.password
    );

    if (!userInfo || !isAuthorizeUser) {
      throw { message: "Invalid credentials" };
    }
    const token = generateToken({ Id: userInfo._id, Email: userInfo.email });
    return token;
  }

  async resetPassword(email: string): Promise<any> {
    const maxGeneratedCode = 9999;
    const minGeneratedCode = 1000;
    validate({ email }, "resetPassword");
    const isValid = await UserDb.doesExist(email);
    if (!isValid) {
      throw {
        message: "Invalid email address",
      };
    }
    const generatedCode = Math.floor(
      Math.random() * (maxGeneratedCode - minGeneratedCode) + minGeneratedCode
    );
    cache.put(email, generatedCode, 120000);
    return generatedCode;
  }

  async confirmResetPassword(
    email: string,
    password: string,
    code: number
  ): Promise<void> {
    const data = {
      email,
      password,
      code,
    };
    const generatedCode = cache.get(email);
    validate(data, "confirmResetPassword");
    if (parseInt(generatedCode, 10) !== code) {
      throw { message: "Access code expired or Invalid" };
    }

    const userInfo = UserDb.doesExist(email);
    if (!userInfo) {
      throw {
        message: "Invalid email address",
      };
    }

    const generateNewHashKey = await generateHashPassword(password);
    const updateUserData = UserDb.resetPassword(email, generateNewHashKey);
    return updateUserData;
  }
}
