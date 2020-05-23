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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const dispositivo_controller_1 = __importDefault(require("../controllers/dispositivo.controller"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer_1.default({ storage: storage });
var router = express_1.default.Router();
// SHOW ID
router.get('/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectura = yield dispositivo_controller_1.default.ShowLectura(req.params.id);
            if (lectura == null)
                res.status(404).send();
            else
                res.send(lectura);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
});
// CREATE
router.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectura = yield dispositivo_controller_1.default.CreateLectura(req.body);
            res.send(lectura);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
});
//UPDATE
router.put('/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectura = yield dispositivo_controller_1.default.UpdateLectura({ _id: req.params.id }, req.body);
            if (lectura == null)
                res.status(404).send();
            else
                res.send(lectura);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
});
// DELETE
router.delete('/:id', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectura = yield dispositivo_controller_1.default.DeleteLectura(req.params.id);
            if (lectura == null)
                res.status(404).send();
            else
                res.send(lectura);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
});
// RUTA PARA EL PULPO CON MULTI-PART Y MULTER
router.post('/:refContador', upload.single('photo'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let lectura = yield dispositivo_controller_1.default.CreateLectura({
                path: req.file.destination + req.file.filename,
                refContador: req.body.refContador,
                data: -1
            });
            res.send(lectura);
        }
        catch (e) {
            res.status(400).send(e);
        }
    });
});
exports.default = router;
