"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const connectDb_1 = __importDefault(require("./utils/connectDb"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
//import morgan from "morgan";
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const students_route_1 = __importDefault(require("./routes/students.route"));
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "10kb" }));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
// 2. Cookie Parser
//app.use(cookieParser(process.env.ACCESS_TOKEN_PRIVATE_KEY));
app.use((0, cookie_parser_1.default)("skilldataEirisappprivatekey"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)());
const port = process.env.PORT || 8000;
// 3. Logger
//if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
// 4. Cors
app.use((0, cors_1.default)());
// 5. Routes
// UnKnown Routes
// Global Error Handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   err.status = err.status || "error";
//   err.statusCode = err.statusCode || 500;
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// });
app.use((0, express_session_1.default)({
    store: new RedisStore({
        /* client: redisClient */ client: "skilldataEirisappprivatekey",
    }),
    secret: 
    /* process.env.ACCESS_TOKEN_PRIVATE_KEY! */ "skilldataEirisappprivatekey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60, // session max age in miliseconds
    },
}));
app.use("/api/users", user_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/students", students_route_1.default);
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    (0, connectDb_1.default)();
});
app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.url} not found`);
    err.statusCode = 404;
    next(err);
});
