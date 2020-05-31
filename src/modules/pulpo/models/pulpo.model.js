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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPulpo = void 0;
const mongoose_1 = require("mongoose");
;
function initPulpo(params) {
    let objSchema = new mongoose_1.Schema({
        name: String,
        user: String,
        password: String,
    }, {
        timestamps: true,
        autoIndex: true,
    });
    //Middlewares mongoose
    objSchema.pre('deleteOne', true, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const objToDel = this;
            yield params.models.Estado.deleteMany({ refPulpo: objToDel._id });
        });
    });
    objSchema.pre('remove', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const objToDel = this;
            yield params.models.Estado.deleteMany({ refPulpo: objToDel._id });
        });
    });
    objSchema.pre('deleteOne', false, function () {
        return __awaiter(this, void 0, void 0, function* () {
            const filtro = this.getQuery();
            const modelo = this.model;
            const objToDel = yield modelo.findOne(filtro);
            if (objToDel != null) {
                yield params.models.Estado.deleteMany({ refPulpo: objToDel._id });
            }
        });
    });
    objSchema.pre('deleteMany', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const filtro = this.getQuery();
            const arrObjToDel = yield this.model.find(filtro);
            for (let objToDel of arrObjToDel) {
                yield params.models.Estado.deleteMany({ refPulpo: objToDel._id });
            }
        });
    });
    let objModel = mongoose_1.model('Pulpo', objSchema);
    return {
        objModel,
        objSchema
    };
}
exports.initPulpo = initPulpo;
