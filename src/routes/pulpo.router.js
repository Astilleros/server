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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPulpoRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
function initPulpoRouter($) {
    var storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });
    var upload = multer_1.default({ storage: storage });
    var router = express_1.Router();
    // SHOW TIME UTC
    router.get('/utc/', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let time = yield $.pulpo.timeUTC();
                if (time == null)
                    res.status(404).send();
                else
                    res.send(time);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    });
    // CREATE ESTADO
    router.post('/estado/', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let estado = yield $.pulpo.saveEstado({
                    refPulpo: req.body.refPulpo,
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
    // SHOW PROGRAMACION
    router.get('/programacion/:refPulpo', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let programacion = yield $.pulpo.showProgramacion(req.body.refPulpo);
                if (programacion == undefined)
                    res.status(404).send();
                else
                    res.send(programacion);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    });
    // RUTA PARA EL PULPO CON MULTI-PART Y MULTER
    router.post('/lectura/:refContador', upload.single('photo'), function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let lectura = yield $.pulpo.saveLectura({
                    path: req.file.destination + req.file.filename,
                    refContador: req.body.refContador,
                    data: req.body.data
                });
                res.send(lectura);
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    });
    // RESTART DB
    router.get('/db/', function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ok = yield $.pulpo.restartDB();
                if (ok == false)
                    res.status(404).send();
                else
                    res.status(200).send();
            }
            catch (e) {
                res.status(400).send(e);
            }
        });
    });
    return router;
}
exports.initPulpoRouter = initPulpoRouter;
