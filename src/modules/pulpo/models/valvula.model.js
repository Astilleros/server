"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initValvula = void 0;
const mongoose_1 = require("mongoose");
;
function initValvula($) {
    let objSchema = new mongoose_1.Schema({
        name: String
    }, {
        timestamps: true,
        autoIndex: true,
    });
    let objModel = mongoose_1.model('Valvula', objSchema);
}
exports.initValvula = initValvula;
