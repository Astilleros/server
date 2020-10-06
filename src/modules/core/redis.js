"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.cache = exports.mngCache = exports.cacheConnect = void 0;
const redisModule = __importStar(require("redis"));
const cfg_1 = __importDefault(require("../../cfg/cfg"));
let redis;
exports.cacheConnect = new Promise(function (resolve) {
    redis = redisModule.createClient(cfg_1.default.redis.port, cfg_1.default.redis.host);
    redis.on("error", function (error) {
        console.error('Error conectando a redis.');
    });
    redis.on('ready', () => {
        console.error('Éxito conectando a redis.');
        resolve(true);
    });
});
class mngCache {
    setCached(strKey, rawValue, objOpt = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Redis setCached: ', strKey);
            yield redis.set(strKey, rawValue, objOpt);
        });
    }
    getCached(strKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis.get(strKey);
        });
    }
    delCached(strKey) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Redis delCached: ', strKey);
            yield redis.del(strKey);
        });
    }
    testCached(strKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield this.getCached(strKey)) != undefined ? true : false);
        });
    }
    wrap(strKey, ptrFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            let rawReturnData;
            if (yield this.testCached(strKey)) {
                console.log('Redis wrap: ', strKey);
                rawReturnData = yield this.getCached(strKey);
            }
            else {
                console.log('Mongo wrap: ', strKey);
                rawReturnData = yield ptrFunc();
                this.setCached(strKey, rawReturnData);
            }
            return rawReturnData;
        });
    }
}
exports.mngCache = mngCache;
exports.cache = new mngCache();
