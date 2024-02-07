"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_routing_files_1 = __importDefault(require("./routes/register-routing-files"));
const body_parser_1 = __importDefault(require("body-parser"));
const easyResponse_middleware_1 = require("./middleware/easyResponse.middleware");
const variables_1 = require("./variables");
const app = express_1.default();
app.use(body_parser_1.default.json()); // support json encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // support encoded bodies
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // Pass to next layer of middleware
    next();
});
// add middleware for handle response
app.use(easyResponse_middleware_1.easyResponse);
// define a route handler for the default home page
app.use("/", register_routing_files_1.default);
// start the Express server
app.listen(variables_1.variables.Port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${variables_1.variables.Port}`);
});
//# sourceMappingURL=index.js.map