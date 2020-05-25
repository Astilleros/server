"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
let objModel = mongoose_1.model('Estado', objSchema);
exports.default = {
    objModel,
    objSchema
};
