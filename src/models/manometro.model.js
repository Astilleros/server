"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
let ManometroSchema = new mongoose_1.Schema({
    name: String
}, {
    timestamps: true,
    autoIndex: true,
});
exports.default = mongoose_1.model('Manometro', ManometroSchema);
