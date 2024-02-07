"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const service_config_1 = require("../services/service.config");
const route_move_1 = __importDefault(require("./move/route.move"));
const user_route_1 = require("./Users/user.route");
const post_route_1 = require("./Users/post.route");
const authenticate_middleware_1 = require("../middleware/authenticate.middleware");
const registeredRouters = express_1.default.Router();
const config = service_config_1.ConfigService.getInstance().getConfig();
/**
 * Common Routes
 */
registeredRouters.use('/api/move', route_move_1.default);
registeredRouters.use('/api/v1/users', user_route_1.userRoutes);
registeredRouters.use('/api/v1/posts', authenticate_middleware_1.authenticateUser, post_route_1.postRoutes);
module.exports = registeredRouters;
//# sourceMappingURL=register-routing-files.js.map