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
const mongoose_1 = require("mongoose");
const valvula_1 = __importDefault(require("./valvula"));
const manometro_1 = __importDefault(require("./manometro"));
const contador_1 = __importDefault(require("./contador"));
const programacion_1 = __importDefault(require("./programacion"));
;
let PulpoSchema = new mongoose_1.Schema({
    name: String,
    user: String,
    password: String,
    contadores: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Contador'
        }],
    manometros: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Manometro'
        }],
    valvulas: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Valvula'
        }],
    programaciones: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Programacion'
        }]
}, {
    timestamps: true,
    autoIndex: true,
});
//Middlewares mongoose
PulpoSchema.pre('deleteOne', { query: false, document: true }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const objToDel = this;
        yield contador_1.default.deleteMany({ _id: objToDel.contadores });
        yield manometro_1.default.deleteMany({ _id: objToDel.manometros });
        yield valvula_1.default.deleteMany({ _id: objToDel.valvulas });
        yield programacion_1.default.deleteMany({ _id: objToDel.programaciones });
    });
});
PulpoSchema.pre('deleteOne', { query: true, document: false }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const objToDel = yield this.model.findOne(filtro);
        yield contador_1.default.deleteMany({ _id: objToDel.contadores });
        yield manometro_1.default.deleteMany({ _id: objToDel.manometros });
        yield valvula_1.default.deleteMany({ _id: objToDel.valvulas });
        yield programacion_1.default.deleteMany({ _id: objToDel.programaciones });
    });
});
PulpoSchema.pre('deleteMany', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const arrObjToDel = yield this.model.find(filtro);
        for (let objToDel of arrObjToDel) {
            yield contador_1.default.deleteMany({ _id: objToDel.contadores });
            yield manometro_1.default.deleteMany({ _id: objToDel.manometros });
            yield valvula_1.default.deleteMany({ _id: objToDel.valvulas });
            yield programacion_1.default.deleteMany({ _id: objToDel.programaciones });
        }
    });
});
let Pulpo = new mongoose_1.model('Pulpo', PulpoSchema);
exports.default = Pulpo;
