"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const pulpo_router_1 = __importDefault(require("./pulpo.router"));
function Routes(app) {
    app.use('/', pulpo_router_1.default);
}
exports.Routes = Routes;
