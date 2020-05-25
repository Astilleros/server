"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Inicializamos mongoose
const db_1 = __importDefault(require("./config/db"));
let db = db_1.default();
// Traemos routers.
const dispositivo_router_1 = __importDefault(require("./routes/dispositivo.router"));
const app = express_1.default();
// MIDDLEWARES
app.use(express_1.default.json());
//app.use(express.urlencoded({ extended: false })); // No vamos a aceptar urlencode post.
// ROUTERS
app.use('/', dispositivo_router_1.default);
exports.default = app;
