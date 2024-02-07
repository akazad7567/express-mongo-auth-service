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
exports.UsersDb = void 0;
const db_global_config_1 = require("../../config/db.global.config");
const variables_1 = require("../../variables");
const mongoConnection = db_global_config_1.MongoGlobal.getMongoInstance();
class UsersDb {
    constructor() {
        this.collectionName = "User";
    }
    static getInstance() {
        if (!UsersDb.resources) {
            UsersDb.resources = new UsersDb();
        }
        return UsersDb.resources;
    }
    doesExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // first method for fetching DB
            const dbClient = yield mongoConnection.getMongoConnection();
            try {
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const pipeline = [
                    {
                        $match: {
                            email,
                        },
                    },
                    {
                        $limit: 1,
                    },
                ];
                const [userInfo] = yield database
                    .collection(this.collectionName)
                    .aggregate(pipeline)
                    .toArray();
                return userInfo;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                yield dbClient.close();
            }
            // Second method for fetching DB
            // return new Promise((resolve, reject) => {
            //   mongoConnection.getMongoConnection().then(async (mongoClient: any) => {
            //     const mongoDb = mongoClient.db("Test2");
            //     mongoDb
            //       .collection(this.collectionName)
            //       .findOne({ email })
            //       .then((resultData: any, error: any) => {
            //         mongoClient.close();
            //         if (error) reject(error);
            //         resolve(resultData);
            //       });
            //   });
            // }).catch((error) => {
            //   console.log("Catch error: ", error);
            //   throw error;
            // });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield mongoConnection.getMongoConnection();
            try {
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const userInfo = yield database
                    .collection(this.collectionName)
                    .insertOne(data);
                return userInfo;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                yield dbClient.close();
            }
        });
    }
    resetPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // query with mongodb api method
            // const dbClient: any = await mongoConnection.getMongoConnection();
            // try {
            //   // Define the update operation
            //   const update = {
            //     $set: {
            //       password,
            //     },
            //   };
            //   const database = await dbClient.db(variables.DatabaseName);
            //   const userInfo = await database
            //     .collection(this.collectionName)
            //     .findOneAndUpdate({ email }, update);
            //   return userInfo;
            // } catch (error) {
            //   throw { message: "Unable to retrieve data" };
            // } finally {
            //   await dbClient.close();
            // }
            // Query with aggregation method
            const dbClient = yield mongoConnection.getMongoConnection();
            try {
                // Define the update operation
                const pipeline = [
                    {
                        $match: {
                            email,
                        },
                    },
                    {
                        $set: {
                            password,
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            email: 1,
                        },
                    },
                ];
                const database = yield dbClient.db(variables_1.variables.DatabaseName);
                const [userInfo] = yield database
                    .collection(this.collectionName)
                    .aggregate(pipeline)
                    .toArray();
                return userInfo;
            }
            catch (error) {
                throw { message: "Unable to retrieve data" };
            }
            finally {
                yield dbClient.close();
            }
        });
    }
}
exports.UsersDb = UsersDb;
//# sourceMappingURL=db.service.user.js.map