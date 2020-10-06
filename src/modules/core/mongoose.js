"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const cfg_1 = __importDefault(require("../../cfg/cfg"));
let dbConnect = new Promise(function (resolve) {
    mongoose_1.default.connection.on('error', function (error) {
        console.error('Error conectando a mongodb.', error);
    });
    mongoose_1.default.connection.once('open', function () {
        console.error('Éxito conectando a mongodb.');
        resolve(mongoose_1.default);
    });
    mongoose_1.default.connect(cfg_1.default.mongodb.uri, cfg_1.default.mongodb.options);
});
exports.dbConnect = dbConnect;
