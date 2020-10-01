import { mongoose } from './core';


//  --------------------------------
//  -------- Inmobiliaria ----------
export interface IInmobiliaria extends mongoose.Document {
    name: string,
    description: string,
    initials: string
};

let inmobiliariaSchema : mongoose.Schema = new mongoose.Schema( {
    name: String,
    description: String,
    initials: String,
}, { timestamps: true, strict: true } );

export let Inmobiliaria : mongoose.Model<IInmobiliaria> =  mongoose.model<IInmobiliaria>('Inmobiliaria', inmobiliariaSchema);
//  --------------------------------


//  --------------------------------
//  ---------- GrupoContacto -------
export interface IGrupoContacto extends mongoose.Document {
    nombre: string,
    descripcion: string,
    refContacto: [IContacto['_id']]
};

let grupoContactoSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    descripcion: String,
    refContacto: [{
        type: mongoose.Types.ObjectId,
        ref: 'Contacto',
    }],

}, { timestamps: true, strict: true } );

export let GrupoContacto : mongoose.Model<IGrupoContacto> =  mongoose.model<IGrupoContacto>('GrupoContacto', grupoContactoSchema);
//  --------------------------------


//  --------------------------------
//  ---------- Contacto ------------
export interface IContacto extends mongoose.Document {
    nombre: string,
    apellidos: string,
    iniciales: string,  
    email: string,
    telefono: string,
    descripcion: string
};

let contactoSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    apellidos: String,
    iniciales: String,  
    email: String,
    telefono: String,
    descripcion: String
}, { timestamps: true, strict: true } );

export let Contacto : mongoose.Model<IContacto> =  mongoose.model<IContacto>('Contacto', contactoSchema);
//  --------------------------------



//  --------------------------------
//  ------ Permiso -----------------
export interface IPermiso extends mongoose.Document {
    nombre: string,
    descripcion: string,
};

let permisoSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    descripcion: String,
}, { timestamps: true, strict: true } );

export let Permiso : mongoose.Model<IPermiso> =  mongoose.model<IPermiso>('Permiso', permisoSchema);
//  --------------------------------


//  --------------------------------
//  ---------- Rol -----------------
export interface IRol extends mongoose.Document {
    nombre: string,
    descripcion: string,
    arrPermiso:  [IPermiso],
};

let rolSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    descripcion: String,
    arrPermiso: [permisoSchema],
}, { timestamps: true, strict: true } );

export let Rol : mongoose.Model<IRol> =  mongoose.model<IRol>('Rol', rolSchema);
//  --------------------------------


//  --------------------------------
//  ---------- Credencial --------
export interface ICredencial extends mongoose.Document {
    usuario: string,
    contrasena: string,
    arrRol: [IRol],
    arrPermiso: [IPermiso]
};

let credencialSchema : mongoose.Schema = new mongoose.Schema( {
    usuario: String,
    contrasena: String,
    arrRol: [rolSchema],
    arrPermiso: [permisoSchema]

}, { timestamps: true, strict: true } );


export let Credencial : mongoose.Model<ICredencial> =  mongoose.model<ICredencial>('Credencial', credencialSchema);
//  --------------------------------


//  --------------------------------
//  ---------- Usuario -------------
export interface IUsuario extends mongoose.Document {
    nombre: string,
    apellidos: string,
    iniciales: string,  
    email: string,
    telefono: string,
    descripcion: string,
    credencial: ICredencial,
    refInmobiliaria: IInmobiliaria['_id'],
    arrGrupoContacto: [IGrupoContacto],
    arrRefExpediente: [IExpediente['_id']]
};

let usuarioSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    apellidos: String,
    iniciales: String,  
    email: String,
    telefono: String,
    descripcion: String,
    credencial: credencialSchema,
    refInmobiliaria: {
        type: mongoose.Types.ObjectId,
        ref: 'Inmobiliaria',
    },
    arrGrupoContacto: [grupoContactoSchema],
    
    arrRefExpediente: {
        type: mongoose.Types.ObjectId,
        ref: 'Expediente',
    },
    

}, { timestamps: true, strict: true } );

export let Usuario : mongoose.Model<IUsuario> =  mongoose.model<IUsuario>('Usuario', usuarioSchema);

//  --------------------------------


//  ------ GridFSFile --------------
//  --------------------------------



//export let GridFile = mongoose.model<IGridFile>('GridFile', gridFileSchema)


//  --------------------------------

/*
//  ------ Folder ------------------
//  --------------------------------
export interface IFolder extends mongoose.Document {
    name: string,
    contentType: string,
    size: number,
    arrRefGridFile: [IGridFile['_id']]
};

let folderSchema : mongoose.Schema = new mongoose.Schema({
    name: String,
    contentType: String,
    size: {
        type: Number,
        default: 0
    },
    arrRefGridFolder: [{
        type: mongoose.Types.ObjectId,
        ref: 'GridFile',
    }],
}, { timestamps: true, strict: true });

export let Folder : mongoose.Model<IFolder> =  mongoose.model<IFolder>('Folder', folderSchema);
//  --------------------------------
*/

//  --------------------------------
//  ---------- CheckList -----------
export enum EstadoCheckList {
    pendiente,
    solicitado,
    proceso,
    validado,
}

export interface ICheckList extends mongoose.Document {
    nombre: string,
    descripcion: string,
    //archivos: IFolder,
    //archivos: [IGridFile['_id']],
    estadoAgente: EstadoCheckList,
    estadoCoordinacion: EstadoCheckList,
    estadoJuridico: EstadoCheckList,
    //refChat: IChat['_id']
};

let checkListSchema : mongoose.Schema = new mongoose.Schema( {
    nombre: String,
    descripcion: String,
    //archivos: folderSchema,
    estadoAgente: { 
        type: String, 
        enum : ['pendiente', 'solicitado', 'proceso', 'validado'], 
        default: 'pendiente'
    },
    estadoCoordinacion: { 
        type: String, 
        enum : ['pendiente', 'solicitado', 'proceso', 'validado'], 
        default: 'pendiente'
    },
    estadoJuridico: { 
        type: String, 
        enum : ['pendiente', 'solicitado', 'proceso', 'validado'], 
        default: 'pendiente'
    },
    /*
    refChat: {
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
    },
    */
}, { timestamps: true, strict: true } );

export let CheckList : mongoose.Model<ICheckList> =  mongoose.model<ICheckList>('CheckList', checkListSchema);
//  --------------------------------


//  --------------------------------
//  ---------- Expediente ----------
export interface IExpediente extends mongoose.Document {
    identifcador: string,
    direccion: string,  
    catastro: string,
    descripcion: string,
    arrRefCheckList: [ICheckList],
    arrRefAgente: [IContacto['_id']],
    arrRefPropietario: [IContacto['_id']],
    refInmobiliaria: IInmobiliaria['_id']
};

let expedienteSchema : mongoose.Schema = new mongoose.Schema( {
    identifcador: String,
    direccion: String,  
    catastro: String,
    descripcion: String,
    arrRefCheckList: checkListSchema,
    arrRefAgente: [{
        type: mongoose.Types.ObjectId,
        ref: 'Contacto',
    }],
    arrRefPropietario: [{
        type: mongoose.Types.ObjectId,
        ref: 'Contacto',
    }],
    refInmobiliaria: {
        type: mongoose.Types.ObjectId,
        ref: 'Inmobiliaria',
    }

}, { timestamps: true, strict: true } );

export let Expediente : mongoose.Model<IExpediente> =  mongoose.model<IExpediente>('Expediente', expedienteSchema);
//  --------------------------------