"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initManometro = void 0;
const mongoose_1 = require("mongoose");
;
function initManometro($) {
    let objSchema = new mongoose_1.Schema({
        name: String
    }, {
        timestamps: true,
        autoIndex: true,
    });
    let objModel = mongoose_1.model('Manometro', objSchema);
}
exports.initManometro = initManometro;
