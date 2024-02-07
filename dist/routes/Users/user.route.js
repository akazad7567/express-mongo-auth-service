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
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../../services/user.service");
exports.userRoutes = express_1.default.Router();
const userHandler = user_service_1.User.getInstance();
exports.userRoutes.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userHandler.healthCheck();
        res.ok(data);
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.userRoutes.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log("🚀 ~ file: user.route.ts:18 ~ userRoutes.post ~ name, email, password :", name, email, password);
        const data = yield userHandler.signup(name, email, password);
        res.ok({ data });
    }
    catch (error) {
        console.log("🚀 ~ file: user.route.ts:22 ~ userRoutes.post ~ error:", error);
        res.badRequest({ message: error });
    }
}));
exports.userRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield userHandler.login(email, password);
        res.ok({ token });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.userRoutes.post("/reset-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const data = yield userHandler.resetPassword(email);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.userRoutes.patch("/reset-confirm", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, code } = req.body;
        const data = yield userHandler.confirmResetPassword(email, password, code);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
//# sourceMappingURL=user.route.js.map