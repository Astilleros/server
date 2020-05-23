"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
let PresionSchema = new mongoose_1.Schema({
    name: String,
    refManometro: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Manometro'
    },
    data: Number
}, {
    timestamps: true,
    autoIndex: true,
});
let Presion = new mongoose_1.model('Presion', PresionSchema);
exports.default = Presion;
