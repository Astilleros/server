"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
let objSchema = new mongoose_1.Schema({
    name: String
}, {
    timestamps: true,
    autoIndex: true,
});
let objModel = mongoose_1.model('Manometro', objSchema);
exports.default = {
    objModel,
    objSchema
};
