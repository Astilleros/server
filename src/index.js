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
const mongoose_1 = require("./modules/core/mongoose");
const redis_1 = require("./modules/core/redis");
const pulpo_class_1 = require("./modules/pulpo/class/pulpo.class");
const filesystem_class_1 = require("./modules/filesystem/class/filesystem.class");
const express_1 = __importDefault(require("express"));
const index_router_1 = require("./routes/index.router");
const http_1 = __importDefault(require("http"));
var $ = {
    cfg: config_1.default,
    //  ----------
    app: undefined,
    //  ----------
    db: undefined,
    //  ----------
    redis: undefined,
    //  ----------
    pulpo: undefined,
    //  ----------
    gfs: undefined,
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (() => __awaiter(void 0, void 0, void 0, function* () {
        // INIT DB
        $.db = yield mongoose_1.initMongoose($);
        // INICIAMOS REDDIS
        $.redis = yield redis_1.initRedisClient($);
        // INIT MNGPULPO CLASS - CON MONGOOSE Y REDIS DB
        $.pulpo = new pulpo_class_1.mngPulpo($);
        // INIT MNG MONGO FILES
        $.gfs = new filesystem_class_1.mngGFS($);
        // INICIAMOS APP EXPRESS
        $.app = express_1.default();
        $.app.set('port', $.cfg.http.port);
        // MIDDLEWARES
        $.app.use(express_1.default.json());
        // ROUTERS
        index_router_1.initRoutes($);
        //SERVER
        let server = http_1.default.createServer($.app);
        server.listen($.cfg.http.port);
        server.on('error', () => console.log('error server http.'));
        server.on('listening', () => console.log('escuchando...'));
    }))();
    setTimeout(() => {
        if ($.gfs)
            $.gfs.pruebas();
        if ($.db)
            console.log($.db.models);
    }, 3000);
}))();
