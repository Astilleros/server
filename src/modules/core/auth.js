"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.auth = exports.mngAuth = exports.authEnumPermiso = void 0;
const _1 = require(".");
const models = __importStar(require("../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cfg_1 = __importDefault(require("../../cfg/cfg"));
var authEnumPermiso;
(function (authEnumPermiso) {
    authEnumPermiso["usuarioEfectivo"] = "usuarioEfectivo";
})(authEnumPermiso = exports.authEnumPermiso || (exports.authEnumPermiso = {}));
class mngAuth {
    initRoutes() {
        _1.app.get('/loggin', this.loggin);
        _1.app.get('/reloggin', this.authMiddleware, this.reloggin);
        _1.app.get('/effective', this.authMiddleware, this.getArrEfectiveUsuario);
        _1.app.get('/effective/:effectiveUsuario', this.authMiddleware, this.getEffectiveUsuarioJWT);
    }
    authMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.header("Access-Control-Allow-Origin", "*");
            req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            let headerData = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
            if (headerData == undefined) {
                res.status(401).end("Need JWT.");
            }
            else {
                var token = headerData.split(' ')[1];
                try {
                    let decoded = jsonwebtoken_1.default.verify(token, cfg_1.default.jwt.key);
                    req.usuario = yield models.Usuario.findOne({ _id: decoded.id }, '-credencial.contrasena');
                    next();
                }
                catch (err) {
                    res.status(401).end("Invalid JWT.");
                }
            }
        });
    }
    loggin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = yield models.Usuario.findOne({ 'credencial.usuario': req.body.usuario });
            if (usuario == null || usuario.credencial.contrasena != req.body.contrasena)
                res.status(401).end();
            else {
                console.log('Loggin: ' + usuario.nombre);
                let tokenPayload = {
                    id: usuario._id,
                    arrRol: usuario.credencial.arrRol,
                    arrPermiso: usuario.credencial.arrPermiso
                };
                let token = jsonwebtoken_1.default.sign(tokenPayload, cfg_1.default.jwt.key, { expiresIn: cfg_1.default.jwt.tokenExpireTime });
                res.status(200).json({ token });
            }
        });
    }
    reloggin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuario = yield models.Usuario.findOne({ 'credencial.usuario': req.usuario.credencial.usuario });
            if (usuario == null)
                res.status(404).end();
            else {
                console.log('Reloggin: ' + usuario.nombre);
                let tokenData = {
                    id: usuario._id,
                    arrRol: usuario.credencial.arrRol,
                    arrPermiso: usuario.credencial.arrPermiso
                };
                let token = jsonwebtoken_1.default.sign(tokenData, cfg_1.default.jwt.key, { expiresIn: cfg_1.default.jwt.tokenExpireTime });
                res.status(200).json({ token });
            }
        });
    }
    getArrEfectiveUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            let arrEffectiveUsuario = yield models.Usuario.find({
                refInmobiliaria: req.usuario.refInmobiliaria,
            }, '-credencial.contrasena');
            console.log('Effective contacts for: ' + req.usuario.nombre);
            res.json(arrEffectiveUsuario);
        });
    }
    getEffectiveUsuarioJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let effectiveUsuario = yield models.Usuario.findOne({
                    _id: req.params.effectiveUsuario,
                    refInmobiliaria: req.usuario.refInmobiliaria
                });
                console.log(effectiveUsuario);
                console.log(req.usuario);
                if (effectiveUsuario == null)
                    res.status(404).end('Not found.');
                else {
                    let tokenPayload = {
                        id: effectiveUsuario._id,
                        arrRol: effectiveUsuario.credencial.arrRol,
                        arrPermiso: effectiveUsuario.credencial.arrPermiso
                    };
                    console.log('Effective loggin: ' + effectiveUsuario.nombre);
                    let token = jsonwebtoken_1.default.sign(tokenPayload, cfg_1.default.jwt.key, { expiresIn: cfg_1.default.jwt.tokenExpireTime });
                    res.status(200).json({ token });
                }
            }
            catch (e) {
                res.status(404).end(e.message);
            }
        });
    }
}
exports.mngAuth = mngAuth;
exports.auth = new mngAuth();
