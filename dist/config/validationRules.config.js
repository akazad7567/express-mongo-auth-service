"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = {
    signup: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
    login: joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
    resetPassword: joi_1.default.object({
        email: joi_1.default.string().required(),
    }),
    confirmResetPassword: joi_1.default.object({
        code: joi_1.default.number().required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
    }),
    postSchemaValidate: joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        author: joi_1.default.string().required(),
        published: joi_1.default.boolean().required(),
    })
};
exports.validate = (data, rule) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = schema[rule].validate(data);
    if (error) {
        throw {
            message: "Invalid input",
            errors: error.details[0].message,
        };
    }
});
//# sourceMappingURL=validationRules.config.js.map