
import Joi from "joi";

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

})
};


export const validate =async (data: any, rule: any) : Promise<any> => {
    const { error, value } = schema[rule].validate(data);
    if (error) {
      throw {
        message: "Invalid input",
        errors: error.details[0].message,
      };
    }
  };