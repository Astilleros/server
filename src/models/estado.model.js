"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoSchema = exports.EstadoModel = void 0;
const mongoose_1 = require("mongoose");
;
;
let objSchema = new mongoose_1.Schema({
    reboot: Boolean,
    batery: Number,
    signal: Number,
    presion: Number,
    temperatura: Number,
    humedad: Number,
    refPulpo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Pulpo'
    }
}, {
    timestamps: true,
    autoIndex: true,
});
exports.EstadoSchema = objSchema;
let objModel = mongoose_1.model('Estado', objSchema);
exports.EstadoModel = objModel;
