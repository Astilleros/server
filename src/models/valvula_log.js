"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const ValvulaLogSchema = new mongoose_1.Schema({
    status: String,
    refValvula: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Valvula'
    },
}, {
    timestamps: true,
    autoIndex: true,
});
let ValvulaLog = new mongoose_1.model('ValvulaLog', ValvulaLogSchema);
exports.default = ValvulaLog;
