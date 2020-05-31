"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPulpoRouter = void 0;
const express_1 = require("express");
function initPulpoRouter($) {
    var router = express_1.Router();
    // CREATE ESTADO
    router.post('/estado/', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let estado = yield $.pulpo.saveEstado({
                    refPulpo: req.body.id,
                    reboot: req.body.reboot,
                    batery: req.body.batery,
                    signal: req.body.signal,
                    presion: req.body.presion,
                    temperatura: req.body.temperatura,
                    humedad: req.body.humedad
                });
                res.send(estado);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    });
    return router;
}
exports.initPulpoRouter = initPulpoRouter;
