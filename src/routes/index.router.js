"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const pulpo_router_1 = require("./pulpo.router");
function initRoutes($) {
    $.app.use('/', pulpo_router_1.initPulpoRouter($));
}
exports.initRoutes = initRoutes;
