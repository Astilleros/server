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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const estado_model_1 = __importDefault(require("../models/estado.model"));
const lectura_model_1 = __importDefault(require("../models/lectura.model"));
function timeUTC() {
    return __awaiter(this, void 0, void 0, function* () {
        let nowUTC = moment_timezone_1.default().utc();
        let date = {
            unix: nowUTC.unix(),
            dia: nowUTC.isoWeekday(),
            hora: nowUTC.hour(),
            minuto: nowUTC.minute()
        };
        return date;
    });
}
function saveEstado(objCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield estado_model_1.default.create(objCreate);
    });
}
function saveLectura(objCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_model_1.default.create(objCreate);
    });
}
exports.default = {
    timeUTC,
    saveEstado,
    saveLectura,
};
