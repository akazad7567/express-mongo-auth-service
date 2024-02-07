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
exports.PostsDb = void 0;
const db_global_config_1 = require("../../config/db.global.config");
const variables_1 = require("../../variables");
const mongodb_1 = require("mongodb");
const dbConnection = db_global_config_1.MongoGlobal.getMongoInstance();
class PostsDb {
    constructor() {
        this.collectionName = "Post";
    }
    static getInstance() {
        if (!this.resources) {
            this.resources = new PostsDb();
        }
        return this.resources;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield dbConnection.getMongoConnection();
            try {
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const postData = yield database
                    .collection(this.collectionName)
                    .insertOne(data);
                return postData;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                yield dbClient.close();
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield dbConnection.getMongoConnection();
            try {
                const pipeline = [
                    {
                        $match: {},
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            author: 1,
                            description: 1,
                            published: 1,
                        },
                    },
                ];
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const getAllPost = yield database
                    .collection(this.collectionName)
                    .aggregate(pipeline)
                    .toArray();
                return getAllPost;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                dbClient.close();
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield dbConnection.getMongoConnection();
            try {
                const pipeline = [
                    {
                        $match: {
                            _id: new mongodb_1.ObjectID(id),
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            author: 1,
                            description: 1,
                        },
                    },
                ];
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const [postData] = yield database
                    .collection(this.collectionName)
                    .aggregate(pipeline)
                    .toArray();
                return postData;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                dbClient.close();
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield dbConnection.getMongoConnection();
            try {
                const pipeline = [
                    {
                        $match: {
                            _id: new mongodb_1.ObjectID(id),
                        },
                    },
                    {
                        $set: {
                            author: data.author,
                            description: data.description,
                            title: data.title,
                            published: data.published
                        },
                    },
                ];
                console.log("🚀 ~ file: db.service.post.ts:113 ~ PostsDb ~ update ~ pipeline:", pipeline);
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const postData = yield database
                    .collection(this.collectionName)
                    .updateOne({ _id: new mongodb_1.ObjectID(id) }, { $set: data });
                console.log("🚀 ~ file: db.service.post.ts:133 ~ PostsDb ~ update ~ postData:", postData);
                return postData;
            }
            catch (error) {
                console.log("🚀 ~ file: db.service.post.ts:122 ~ PostsDb ~ update ~ error:", error);
                throw { message: "Unable to retrieve data" };
            }
            finally {
                dbClient.close();
            }
            // const user = await Post.findByIdAndUpdate({ _id: id }, data, {
            //   new: true,
            // });
            // if (!user) {
            //   return "user not available";
            // }
            // return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield dbConnection.getMongoConnection();
            try {
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const postData = yield database
                    .collection(this.collectionName)
                    .deleteOne({ _id: new mongodb_1.ObjectID(id) });
                return postData;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                dbClient.close();
            }
            // const user = await Post.findByIdAndDelete(id);
            // if (!user) {
            //   throw { message: "User not available" };
            // }
            // return user;
        });
    }
}
exports.PostsDb = PostsDb;
//# sourceMappingURL=db.service.post.js.map