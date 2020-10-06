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
const cfg_1 = __importDefault(require("./cfg/cfg"));
const core_1 = require("./modules/core");
const http_1 = __importDefault(require("http"));
const file_1 = require("./modules/mngFile/file");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield core_1.dbConnect;
    yield core_1.cacheConnect;
    file_1.File.initSchemas();
    core_1.auth.initRoutes();
    let server = http_1.default.createServer(core_1.app);
    server.listen(cfg_1.default.http.port);
    server.on('error', (error) => console.log('Error server http.', error));
    server.on('listening', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Servidor http iniciado en puerto: ' + cfg_1.default.http.port);
        console.log(core_1.mongoose.models);
    }));
}))();
