"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValvulaSchema = exports.ValvulaModel = void 0;
const mongoose_1 = require("mongoose");
;
let objSchema = new mongoose_1.Schema({
    name: String
}, {
    timestamps: true,
    autoIndex: true,
});
exports.ValvulaSchema = objSchema;
let objModel = mongoose_1.model('Valvula', objSchema);
exports.ValvulaModel = objModel;
