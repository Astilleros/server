"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLectura = void 0;
const mongoose_1 = require("mongoose");
;
;
function initLectura($) {
    let objSchema = new mongoose_1.Schema({
        path: String,
        refContador: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Contador'
        },
        data: Number
    }, {
        timestamps: true,
        autoIndex: true,
    });
    let objModel = mongoose_1.model('Lectura', objSchema);
}
exports.initLectura = initLectura;
