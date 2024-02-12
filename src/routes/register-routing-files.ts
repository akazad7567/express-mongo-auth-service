import express from "express";

import {ConfigService} from "../services/service.config";
import moveRoutes from './move/route.move';
import { userRoutes } from "./Users/user.route";
import { postRoutes } from "./Users/post.route";
import { authenticateUser } from "../validate/validation";

const registeredRouters = express.Router();
const config = ConfigService.getInstance().getConfig();

registeredRouters.use('/api/move', moveRoutes);
registeredRouters.use('/api/v1/users',userRoutes);
registeredRouters.use('/api/v1/posts',authenticateUser, postRoutes);



export = registeredRouters ;


