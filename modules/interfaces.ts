import { mongoose } from './core';

export interface IInmobiliaria extends mongoose.Document {
    name: string,
    description: string,
    initials: string
};

//---
export interface IContacto extends mongoose.Document {
    nombre: string,
    apellidos: string,
    iniciales: string,  
    email: string,
    telefono: string,
    descripcion: string
};

export interface IGrupoContacto extends mongoose.Document {
    nombre: string,
    descripcion: string,
    refContacto: [IContacto['_id']]
};

//---
export interface IPermiso extends mongoose.Document {
    nombre: string,
    descripcion: string,
};

export interface IRol extends mongoose.Document {
    nombre: string,
    descripcion: string,
    arrPermiso:  [IPermiso],
};

export interface ICredencial extends mongoose.Document {
    usuario: string,
    contrasena: string,
    arrRol: [IRol],
    arrPermiso: [IPermiso]
};

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

//--------------------------
export interface IFolder extends mongoose.Document {
    name: string,
    arrRefGridFile: [any]
};

//--------------------------
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

//--------------------------
export interface Plantilla {
    texto_alarma: string
    plantilla_envio_email: string,
    plantilla_envio_whatsapp: string,
    plantilla_envio_ayuda: string,
    archivos_asociados_plantilla: IFolder

}
export interface GrupoPlantilla{
    subgrupos: [GrupoPlantilla],
    plantillas: [Plantilla]
}