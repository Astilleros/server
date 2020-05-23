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
const lectura_1 = __importDefault(require("../models/lectura"));
function IndexLectura() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_1.default.find({});
    });
}
;
/*
export interface IShowLecturaInput {
  objId: mongoose.Types.ObjectId
}*/
function ShowLectura(objId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_1.default.findOne({ _id: objId });
    });
}
;
function CreateLectura(objCreate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_1.default.create(objCreate);
    });
}
function UpdateLectura(objId, objUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_1.default.findOneAndUpdate({ _id: objId }, objUpdate, { new: true });
    });
}
;
function DeleteLectura(objId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield lectura_1.default.findByIdAndDelete(objId);
    });
}
;
exports.default = {
    IndexLectura,
    ShowLectura,
    CreateLectura,
    UpdateLectura,
    DeleteLectura
};
