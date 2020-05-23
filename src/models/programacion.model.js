"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
let ProgramacionSchema = new mongoose_1.Schema({
    data: String,
    running: Boolean
}, {
    timestamps: true,
    autoIndex: true,
});
let Programacion = new mongoose_1.model('Programacion', ProgramacionSchema);
exports.default = Programacion;
