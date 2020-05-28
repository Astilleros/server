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
const valvula_log_1 = __importDefault(require("./valvula_log"));
;
let ValvulaSchema = new mongoose_1.Schema({
    name: String
}, {
    timestamps: true,
    autoIndex: true,
});
//Middlewares mongoose
ValvulaSchema.pre('deleteOne', { query: false, document: true }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const objToDel = this;
        yield valvula_log_1.default.deleteMany({ valvula_id: objToDel._id });
    });
});
ValvulaSchema.pre('deleteOne', { query: true, document: false }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const objToDel = yield this.model.findOne(filtro);
        yield valvula_log_1.default.deleteMany({ valvula_id: objToDel._id });
    });
});
ValvulaSchema.pre('deleteMany', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const filtro = this.getFilter();
        const arrObjToDel = yield this.model.find(filtro);
        for (let objToDel of arrObjToDel) {
            yield valvula_log_1.default.deleteMany({ valvula_id: objToDel._id });
        }
    });
});
let Valvula = new mongoose_1.model('Valvula', ValvulaSchema);
exports.default = Valvula;
