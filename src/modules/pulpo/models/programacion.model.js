"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramacionSchema = exports.ProgramacionModel = void 0;
const mongoose_1 = require("mongoose");
;
;
let objSchema = new mongoose_1.Schema({
    data: String,
    running: Boolean,
    inicio: Date,
    final: Date
}, {
    timestamps: true,
    autoIndex: true,
});
exports.ProgramacionSchema = objSchema;
let objModel = mongoose_1.model('Programacion', objSchema);
exports.ProgramacionModel = objModel;
