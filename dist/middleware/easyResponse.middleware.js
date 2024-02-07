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
exports.easyResponse = void 0;
exports.easyResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.ok = (data) => {
        res.status(200);
        res.json(data);
        return;
    };
    res.badRequest = (error) => {
        res.status(400);
        res.json(error);
        return;
    };
    res.unauthorized = (error) => {
        res.status(401);
        res.json(error);
        return;
    };
    return next();
});
//# sourceMappingURL=easyResponse.middleware.js.map