"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
let db = db_1.default();
// Traemos routers.
const pulpo_1 = __importDefault(require("./routes/pulpo"));
const contador_1 = __importDefault(require("./routes/contador"));
const lectura_1 = __importDefault(require("./routes/lectura"));
const manometro_1 = __importDefault(require("./routes/manometro"));
const presion_1 = __importDefault(require("./routes/presion"));
const valvula_1 = __importDefault(require("./routes/valvula"));
const valvula_log_1 = __importDefault(require("./routes/valvula_log"));
const programacion_1 = __importDefault(require("./routes/programacion"));
/*
mongoose.connect(config.mongodb_server, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on("disconnected", console.error.bind(console, 'MongoDB connection stopped'));
*/
const app = express_1.default();
// MIDDLEWARES
app.use(express_1.default.json());
//app.use(express.urlencoded({ extended: false }));
// ROUTERS
app.use('/pulpo', pulpo_1.default);
app.use('/contador', contador_1.default);
app.use('/lectura', lectura_1.default);
app.use('/manometro', manometro_1.default);
app.use('/presion', presion_1.default);
app.use('/valvula', valvula_1.default);
app.use('/valvula_log', valvula_log_1.default);
app.use('/programacion', programacion_1.default);
exports.default = app;
