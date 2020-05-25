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
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());
const pulpo_model_1 = __importDefault(require("../models/pulpo.model"));
const contador_model_1 = __importDefault(require("../models/contador.model"));
const valvula_model_1 = __importDefault(require("../models/valvula.model"));
const manometro_model_1 = __importDefault(require("../models/manometro.model"));
const estado_model_1 = __importDefault(require("../models/estado.model"));
const lectura_model_1 = __importDefault(require("../models/lectura.model"));
const programacion_model_1 = __importDefault(require("../models/programacion.model"));
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
function showProgramacion(refPulpo) {
    return __awaiter(this, void 0, void 0, function* () {
        let objPulpo = yield pulpo_model_1.default.objModel.findOne({ _id: refPulpo });
        if (objPulpo == null) {
            return undefined;
        }
        let objProgramacion;
        for (let programacion of objPulpo.programaciones) {
            if (moment_timezone_1.default.utc().isBetween(moment_timezone_1.default(programacion.inicio), moment_timezone_1.default(programacion.final))) {
                objProgramacion = programacion;
                return objProgramacion;
            }
        }
    });
}
function saveEstado(objCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield estado_model_1.default.objModel.create(objCreate);
    });
}
function saveLectura(objCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_model_1.default.objModel.create(objCreate);
    });
}
function restartDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pulpo_model_1.default.objModel.deleteMany({});
            let objPulpo = new pulpo_model_1.default.objModel({
                name: 'PName',
                user: 'PUser',
                password: 'PPassword',
                contadores: [],
                manometros: [],
                valvulas: [],
                programaciones: []
            });
            yield contador_model_1.default.objModel.deleteMany({});
            let objContador = yield contador_model_1.default.objModel.create({
                name: 'PContadorName1'
            });
            objPulpo.contadores.push(objContador);
            objPulpo.contadores.push({
                name: 'PContadorName2'
            });
            yield valvula_model_1.default.objModel.deleteMany({});
            let objValvula = yield valvula_model_1.default.objModel.create({
                name: 'PValvulaName'
            });
            objPulpo.valvulas.push(objContador);
            yield manometro_model_1.default.objModel.deleteMany({});
            let objManometro = yield manometro_model_1.default.objModel.create({
                name: 'PManometroName'
            });
            objPulpo.manometros.push(objContador);
            yield programacion_model_1.default.objModel.deleteMany({});
            let objProgramacion = yield programacion_model_1.default.objModel.create({
                data: 'JSONDATAPROGRAMACION? O ARRAY DE SUBDOCS ORDENES',
                running: true,
                inicio: new Date(),
                final: new Date()
            });
            objPulpo.programaciones.push(objContador);
            objPulpo.save();
            // este no tira
            yield pulpo_model_1.default.objModel.updateOne({ _id: objPulpo._id }, { $push: {
                    manometros: {
                        name: 'PManometroName2'
                    }
                }
            }).exec();
            yield lectura_model_1.default.objModel.deleteMany({});
            let objLectura = yield lectura_model_1.default.objModel.create({
                path: 'PPath',
                refContador: objContador._id,
                data: 123
            });
            yield estado_model_1.default.objModel.deleteMany({});
            let objEstado = yield estado_model_1.default.objModel.create({
                reboot: true,
                batery: 12,
                signal: 13,
                presion: 14,
                temperatura: 15,
                humedad: 16,
                refPulpo: objPulpo._id
            });
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
exports.default = {
    timeUTC,
    saveEstado,
    saveLectura,
    showProgramacion,
    restartDB
};
