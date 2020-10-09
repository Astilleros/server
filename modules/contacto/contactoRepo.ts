import { mongoose } from '../core'
import  { IRepo }  from '../utils'

export interface IContacto extends mongoose.Document {
    nombre: string,
    apellidos: string,
    iniciales: string,  
    email: string,
    telefono: string,
    descripcion: string
};


export interface IContactoRepo extends IRepo<IContacto>{
    getContactoById( contactoId: string): Promise<IContacto>
    findAllContactoByUsuarioId( usuarioId: string ) : Promise<[IContacto]>
}


