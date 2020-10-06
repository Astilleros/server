"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expediente = exports.CheckList = exports.EstadoCheckList = exports.Folder = exports.Usuario = exports.Credencial = exports.Rol = exports.Permiso = exports.Contacto = exports.GrupoContacto = exports.Inmobiliaria = void 0;
const core_1 = require("./core");
;
let inmobiliariaSchema = new core_1.mongoose.Schema({
    name: String,
    description: String,
    initials: String,
}, { timestamps: true, strict: true });
exports.Inmobiliaria = core_1.mongoose.model('Inmobiliaria', inmobiliariaSchema);
;
let grupoContactoSchema = new core_1.mongoose.Schema({
    nombre: String,
    descripcion: String,
    refContacto: [{
            type: core_1.mongoose.Types.ObjectId,
            ref: 'Contacto',
        }],
}, { timestamps: true, strict: true });
exports.GrupoContacto = core_1.mongoose.model('GrupoContacto', grupoContactoSchema);
;
let contactoSchema = new core_1.mongoose.Schema({
    nombre: String,
    apellidos: String,
    iniciales: String,
    email: String,
    telefono: String,
    descripcion: String
}, { timestamps: true, strict: true });
exports.Contacto = core_1.mongoose.model('Contacto', contactoSchema);
;
let permisoSchema = new core_1.mongoose.Schema({
    nombre: String,
    descripcion: String,
}, { timestamps: true, strict: true });
exports.Permiso = core_1.mongoose.model('Permiso', permisoSchema);
;
let rolSchema = new core_1.mongoose.Schema({
    nombre: String,
    descripcion: String,
    arrPermiso: [permisoSchema],
}, { timestamps: true, strict: true });
exports.Rol = core_1.mongoose.model('Rol', rolSchema);
;
let credencialSchema = new core_1.mongoose.Schema({
    usuario: String,
    contrasena: String,
    arrRol: [rolSchema],
    arrPermiso: [permisoSchema]
}, { timestamps: true, strict: true });
exports.Credencial = core_1.mongoose.model('Credencial', credencialSchema);
;
let usuarioSchema = new core_1.mongoose.Schema({
    nombre: String,
    apellidos: String,
    iniciales: String,
    email: String,
    telefono: String,
    descripcion: String,
    credencial: credencialSchema,
    refInmobiliaria: {
        type: core_1.mongoose.Types.ObjectId,
        ref: 'Inmobiliaria',
    },
    arrGrupoContacto: [grupoContactoSchema],
    arrRefExpediente: {
        type: core_1.mongoose.Types.ObjectId,
        ref: 'Expediente',
    },
}, { timestamps: true, strict: true });
exports.Usuario = core_1.mongoose.model('Usuario', usuarioSchema);
;
let folderSchema = new core_1.mongoose.Schema({
    name: String,
    refExpediente: {
        type: core_1.mongoose.Types.ObjectId,
        ref: 'Expediente',
    },
    arrRefGridFile: [{
            type: core_1.mongoose.Types.ObjectId,
            ref: 'GridFile',
        }],
}, { timestamps: true, strict: true });
exports.Folder = core_1.mongoose.model('Folder', folderSchema);
var EstadoCheckList;
(function (EstadoCheckList) {
    EstadoCheckList[EstadoCheckList["pendiente"] = 0] = "pendiente";
    EstadoCheckList[EstadoCheckList["solicitado"] = 1] = "solicitado";
    EstadoCheckList[EstadoCheckList["proceso"] = 2] = "proceso";
    EstadoCheckList[EstadoCheckList["validado"] = 3] = "validado";
})(EstadoCheckList = exports.EstadoCheckList || (exports.EstadoCheckList = {}));
;
let checkListSchema = new core_1.mongoose.Schema({
    nombre: String,
    descripcion: String,
    estadoAgente: {
        type: String,
        enum: ['pendiente', 'solicitado', 'proceso', 'validado'],
        default: 'pendiente'
    },
    estadoCoordinacion: {
        type: String,
        enum: ['pendiente', 'solicitado', 'proceso', 'validado'],
        default: 'pendiente'
    },
    estadoJuridico: {
        type: String,
        enum: ['pendiente', 'solicitado', 'proceso', 'validado'],
        default: 'pendiente'
    },
}, { timestamps: true, strict: true });
exports.CheckList = core_1.mongoose.model('CheckList', checkListSchema);
;
let expedienteSchema = new core_1.mongoose.Schema({
    identifcador: String,
    direccion: String,
    catastro: String,
    descripcion: String,
    arrRefCheckList: checkListSchema,
    arrRefAgente: [{
            type: core_1.mongoose.Types.ObjectId,
            ref: 'Contacto',
        }],
    arrRefPropietario: [{
            type: core_1.mongoose.Types.ObjectId,
            ref: 'Contacto',
        }],
    refInmobiliaria: {
        type: core_1.mongoose.Types.ObjectId,
        ref: 'Inmobiliaria',
    }
}, { timestamps: true, strict: true });
exports.Expediente = core_1.mongoose.model('Expediente', expedienteSchema);
