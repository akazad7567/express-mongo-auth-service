import * as cache from "memory-cache";

import { InterfaceUserHandler } from "../../interfaces/interface.userHandler";
import { validate } from "../../validate/validation";
import { UsersDb } from "./db.service.users";
import * as check from '../../validate/validation';

const UserDb = UsersDb.getInstance();
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
    const hashKey = await check.generateHashPassword(password);
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
    const isAuthorizeUser = await check.validateCredentials(
      password,
      userInfo.password
    );

    if (!userInfo || !isAuthorizeUser) {
      throw { message: "Invalid credentials" };
    }
    const token = check.generateToken({ Id: userInfo._id, Email: userInfo.email });
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

    const generateNewHashKey = await check.generateHashPassword(password);
    const updateUserData = UserDb.resetPassword(email, generateNewHashKey);
    return updateUserData;
  }
}
