import Joi from 'joi';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { Request, Response } from 'express';

const { sign, decode, verify } = jsonwebtoken;
const slatRounds = 10;
const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  resetPassword: Joi.object({
    email: Joi.string().required(),
  }),
  confirmResetPassword: Joi.object({
    code: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  postSchemaValidate: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().required(),
    published: Joi.boolean().required(),
  }),
};

export const validate = async (data: any, rule: any): Promise<any> => {
  const { error, value } = schema[rule].validate(data);
  if (error) {
    throw {
      message: 'Invalid input',
      errors: error.details[0].message,
    };
  }
};
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<void> => {
  try {
    const { token } = req.headers;
    const decoded = verify(token, 'secret');

    if (!decoded.userInfo) {
      throw {
        message: 'Token missing in headers or Invalid token',
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
export const easyResponse = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  res.ok = (data: any) => {
    res.status(200);
    res.json(data);
    return;
  };

  res.badRequest = (error: any) => {
    res.status(400);
    res.json(error);
    return;
  };

  res.unauthorized = (error: any) => {
    res.status(401);
    res.json(error);
    return;
  };

  return next();
};
export const generateToken = (userInfo: any) =>
  sign(
    {
      userInfo,
    },
    'secret',
    { expiresIn: '1h' }
  );

export const generateHashPassword = async (password: any): Promise<any> => {
  return bcrypt
    .hash(password, slatRounds)
    .then((hash: any) => {
      return hash;
    })
    .catch((error: any) => console.log(error.message));
};
export const validateCredentials = async (
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
