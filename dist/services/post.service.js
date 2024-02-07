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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsHandler = void 0;
const validationRules_config_1 = require("../config/validationRules.config");
const db_service_post_1 = require("./db.services/db.service.post");
const PostDb = db_service_post_1.PostsDb.getInstance();
class PostsHandler {
    constructor() { }
    static getInstance() {
        if (!this.postInstance) {
            this.postInstance = new PostsHandler();
        }
        return this.postInstance;
    }
    addPost(title, author, description, published) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                title,
                author,
                description,
                published,
            };
            validationRules_config_1.validate(data, "postSchemaValidate");
            const post = yield PostDb.create(data);
            return post;
        });
    }
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostDb.getAll();
            return posts;
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostDb.get(id);
            return post;
        });
    }
    updatePostById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostDb.update(id, data);
            return post;
        });
    }
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PostDb.delete(id);
            return { message: "Post deleted" };
        });
    }
}
exports.PostsHandler = PostsHandler;
//# sourceMappingURL=post.service.js.map