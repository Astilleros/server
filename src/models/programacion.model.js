"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
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
exports.default = {
    objModel,
    objSchema
};
