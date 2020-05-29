"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/*
*/
// Traemos routers.
//import pulpoRouter from './routes/pulpo.router';
const index_router_1 = require("./routes/index.router");
const app = express_1.default();
// MIDDLEWARES
app.use(express_1.default.json());
//app.use(express.urlencoded({ extended: false })); // No vamos a aceptar urlencode post.
// ROUTERS
index_router_1.Routes(app);
exports.default = app;
