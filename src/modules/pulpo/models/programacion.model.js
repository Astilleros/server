"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProgramacion = void 0;
const mongoose_1 = require("mongoose");
;
;
function initProgramacion($) {
    let objSchema = new mongoose_1.Schema({
        data: String,
        running: Boolean,
        inicio: Date,
        final: Date
    }, {
        timestamps: true,
        autoIndex: true,
    });
    let objModel = mongoose_1.model('Programacion', objSchema);
    return {
        objModel,
        objSchema
    };
}
exports.initProgramacion = initProgramacion;
