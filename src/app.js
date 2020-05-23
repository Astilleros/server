"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());
let nowUTC = moment_timezone_1.default().utc();
let date = {
    unix: nowUTC.unix(),
    dia: nowUTC.isoWeekday(),
    hora: nowUTC.hour(),
    minuto: nowUTC.minute()
};
console.log(date);
// Inicializamos mongoose
const db_1 = __importDefault(require("./config/db"));
let db = db_1.default();
// Traemos routers.
const dispositivo_router_1 = __importDefault(require("./routes/dispositivo.router"));
const app = express_1.default();
// MIDDLEWARES
app.use(express_1.default.json());
//app.use(express.urlencoded({ extended: false }));
// ROUTERS
app.use('/', dispositivo_router_1.default);
exports.default = app;
