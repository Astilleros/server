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
const lectura_1 = __importDefault(require("../models/lectura"));
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
router.post('/:id/photo', upload.single('photo'), function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let photo = new lectura_1.default({
            path: req.file.destination + req.file.filename,
            cam_id: req.body.cam_id,
            pulpo_id: req.params.id
        });
        console.log(photo);
        yield photo.save();
        res.send('OK Foto');
    });
});
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('hi');
        res.send('Hi');
    });
});
exports.default = router;
