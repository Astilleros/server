"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
let LecturaSchema = new mongoose_1.Schema({
    path: String,
    refContador: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Contador'
    },
    data: Number
}, {
    timestamps: true,
    autoIndex: true,
});
exports.default = mongoose_1.model('Lectura', LecturaSchema);
