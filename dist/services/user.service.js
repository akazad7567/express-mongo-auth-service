"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.User = void 0;
const validationRules_config_1 = require("../config/validationRules.config");
const db_service_user_1 = require("./db.services/db.service.user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cache = __importStar(require("memory-cache"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { sign, decode, verify } = jsonwebtoken_1.default;
const slatRounds = 10;
const UserDb = db_service_user_1.UsersDb.getInstance();
const generateToken = (userInfo) => sign({
    userInfo,
}, "secret", { expiresIn: "1h" });
const generateHashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default
        .hash(password, slatRounds)
        .then((hash) => {
        return hash;
    })
        .catch((error) => console.log(error.message));
});
const validateCredentials = (newPass, prvHashPass) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=========newpass and prvHash", newPass, prvHashPass);
    return bcrypt_1.default
        .compare(newPass, prvHashPass)
        .then((res) => {
        return res;
    })
        .catch((error) => console.log(error.message));
});
class User {
    constructor() { }
    static getInstance() {
        if (!this.userInstance) {
            this.userInstance = new User();
        }
        return this.userInstance;
    }
    healthCheck() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                Status: "ok",
                API_SERVER: "Server UP & Running",
            };
        });
    }
    signup(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                name,
                email,
                password,
            };
            console.log("🚀 ~ file: user.service.ts:65 ~ User ~ signup ~ data:", data);
            validationRules_config_1.validate(data, "signup");
            const userExist = yield UserDb.doesExist(email);
            console.log("🚀 ~ file: user.service.ts:68 ~ User ~ signup ~ userExist:", userExist);
            if (userExist) {
                throw { message: "Email address already registered" };
            }
            const hashKey = yield generateHashPassword(password);
            data.password = hashKey;
            const userInfo = yield UserDb.create(data);
            return userInfo;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                email,
                password,
            };
            validationRules_config_1.validate(data, "login");
            const userInfo = yield UserDb.doesExist(email);
            console.log("====================userInfo=?", userInfo);
            const isAuthorizeUser = yield validateCredentials(password, userInfo.password);
            if (!userInfo || !isAuthorizeUser) {
                throw { message: "Invalid credentials" };
            }
            const token = generateToken({ Id: userInfo._id, Email: userInfo.email });
            return token;
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxGeneratedCode = 9999;
            const minGeneratedCode = 1000;
            validationRules_config_1.validate({ email }, "resetPassword");
            const isValid = yield UserDb.doesExist(email);
            if (!isValid) {
                throw {
                    message: "Invalid email address",
                };
            }
            const generatedCode = Math.floor(Math.random() * (maxGeneratedCode - minGeneratedCode) + minGeneratedCode);
            cache.put(email, generatedCode, 120000);
            return generatedCode;
        });
    }
    confirmResetPassword(email, password, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                email,
                password,
                code,
            };
            const generatedCode = cache.get(email);
            validationRules_config_1.validate(data, "confirmResetPassword");
            if (parseInt(generatedCode, 10) !== code) {
                throw { message: "Access code expired or Invalid" };
            }
            const userInfo = UserDb.doesExist(email);
            if (!userInfo) {
                throw {
                    message: "Invalid email address",
                };
            }
            const generateNewHashKey = yield generateHashPassword(password);
            const updateUserData = UserDb.resetPassword(email, generateNewHashKey);
            return updateUserData;
        });
    }
}
exports.User = User;
//# sourceMappingURL=user.service.js.map