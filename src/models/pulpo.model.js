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
const estado_model_1 = __importDefault(require("./estado.model"));
const valvula_model_1 = __importDefault(require("./valvula.model"));
const manometro_model_1 = __importDefault(require("./manometro.model"));
const contador_model_1 = __importDefault(require("./contador.model"));
const programacion_model_1 = __importDefault(require("./programacion.model"));
;
let PulpoSchema = new mongoose_1.Schema({
    name: String,
    user: String,
    password: String,
    contadores: [contador_model_1.default],
    manometros: [manometro_model_1.default],
    valvulas: [valvula_model_1.default],
    programaciones: [programacion_model_1.default]
}, {
    timestamps: true,
    autoIndex: true,
});
//Middlewares mongoose
PulpoSchema.pre('deleteOne', true, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const objToDel = this;
        yield estado_model_1.default.deleteMany({ refPulpo: objToDel._id });
    });
});
PulpoSchema.pre('deleteOne', false, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const objToDel = yield this.model.findOne(filtro);
        yield estado_model_1.default.deleteMany({ refPulpo: objToDel._id });
    });
});
PulpoSchema.pre('deleteMany', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const arrObjToDel = yield this.model.find(filtro);
        for (let objToDel of arrObjToDel) {
            yield estado_model_1.default.deleteMany({ refPulpo: objToDel._id });
        }
    });
});
exports.default = mongoose_1.model('Pulpo', PulpoSchema);
