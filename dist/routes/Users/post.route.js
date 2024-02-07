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
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const post_service_1 = require("../../services/post.service");
exports.postRoutes = new express_1.default.Router();
const PostHandler = post_service_1.PostsHandler.getInstance();
exports.postRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, description, published } = req.body;
        const data = yield PostHandler.addPost(title, author, description, published);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.postRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield PostHandler.getAllPost();
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.postRoutes.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield PostHandler.getPostById(id);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.postRoutes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield PostHandler.updatePostById(id, req.body);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ message: error });
    }
}));
exports.postRoutes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield PostHandler.deletePostById(id);
        res.ok({ data });
    }
    catch (error) {
        res.badRequest({ error });
    }
}));
//# sourceMappingURL=post.route.js.map