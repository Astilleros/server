"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManometroSchema = exports.ManometroModel = void 0;
const mongoose_1 = require("mongoose");
;
let objSchema = new mongoose_1.Schema({
    name: String
}, {
    timestamps: true,
    autoIndex: true,
});
exports.ManometroSchema = objSchema;
let objModel = mongoose_1.model('Manometro', objSchema);
exports.ManometroModel = objModel;
