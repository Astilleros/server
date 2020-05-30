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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("redis"));
const express_1 = __importDefault(require("express"));
const index_router_1 = require("./routes/index.router");
const http_1 = __importDefault(require("http"));
// en futura clase core/mongoose con params arrService_ModParams, que cargue el cliente en este singleton object with dependencies.
let initMongoose = () => __awaiter(void 0, void 0, void 0, function* () {
    let objMongoose = yield mongoose_1.default.connect(config_1.default.arrConfig_Mongodb.strConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    objMongoose.set('useCreateIndex', true);
    objMongoose.connection.on('connected', function () {
        console.log("[Service] - Connected to MongoDB server.\n");
    });
    objMongoose.connection.on('error', function (err) {
        console.log("[Service] - Error on MongoDB connection.");
        console.log(err);
        process.exit(0);
    });
    objMongoose.connection.on('disconnected', function () {
        console.log("[Service] - Disconnected from MongoDB server.\n");
        process.exit(0);
    });
    // initSchema() => carga de todos los modelos e interfaces "fuera de las clases".
    return objMongoose;
});
// CAMBIO POR core/mngCACHE OOOOO en futura clase core/reddis con params arrService_ModParams, que cargue el cliente en este singleton object with dependencies.
let inicializaReddis = () => {
    const client = redis_1.default.createClient(config_1.default.arrConfig_RedisServer.intPort, config_1.default.arrConfig_RedisServer.strHost);
    client.on("error", function (error) {
        console.error(error);
    });
    return client;
};
// en futura clase core/express con params arrService_ModParams, que cargue la app en este singleton object with dependencies.
let initExpressApp = () => {
    const app = express_1.default();
    app.set('port', config_1.default.arrConfig_WebService.intHttpPort);
    // MIDDLEWARES
    app.use(express_1.default.json());
    // ROUTERS
    index_router_1.Routes(app);
    return app;
};
let initHttp = () => {
    let server = http_1.default.createServer(arrService_ModParams.objExpress);
    server.listen(config_1.default.arrConfig_WebService.intHttpPort);
    server.on('error', () => console.log('error server http.'));
    server.on('listening', () => console.log('escuchando...'));
    return server;
};
var arrService_ModParams = {
    //  ----------
    objExpress: undefined,
    //  ----------
    objMongoose: undefined,
    //  ----------
    objClientReddis: undefined,
    //  ----------
    arrCore: {},
    arrModel: {},
    arrServices: {},
};
// MAIN
(() => __awaiter(void 0, void 0, void 0, function* () {
    arrService_ModParams.objMongoose = yield initMongoose();
    //arrService_ModParams.objClientReddis = await inicializaReddis();
    arrService_ModParams.objExpress = initExpressApp();
    var serverHttp = initHttp();
}))();
