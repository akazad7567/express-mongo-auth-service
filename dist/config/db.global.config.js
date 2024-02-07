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
exports.MongoGlobal = void 0;
const mongodb_1 = require("mongodb");
const variables_1 = require("../variables");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
class MongoGlobal {
    constructor() {
        this.mongoClient = mongodb_1.MongoClient;
    }
    static getMongoInstance() {
        if (!MongoGlobal.mongo) {
            MongoGlobal.mongo = new MongoGlobal();
        }
        return MongoGlobal.mongo;
    }
    ;
    getMongoConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.mongoClient.connect(variables_1.variables.DbConnectionUrl, options).then((client) => __awaiter(this, void 0, void 0, function* () {
                    resolve(client);
                })).catch((error) => {
                    reject(error);
                });
            }).catch((e) => {
                console.log('getMongoConnection catch error: ', e);
            });
            ;
        });
    }
}
exports.MongoGlobal = MongoGlobal;
//# sourceMappingURL=db.global.config.js.map