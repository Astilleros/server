import { Document, Model, model, Types, Schema, Query } from "mongoose";

import Estado, { IEstado } from './estado.model';
import Valvula, { IValvula } from './valvula.model';
import Manometro, { IManometro }   from './manometro.model';
import Contador, { IContador }   from './contador.model';
import Programacion, { IProgramacion }   from './programacion.model';


export interface IPulpo extends Document {
    name: string,
    user: string,
    password: string,
    contadores: Types.Array<IContador>,
    manometros: Types.Array<IManometro>,
    valvulas: Types.Array<IValvula>,
    programaciones: Types.Array<IProgramacion>
};


let objSchema: Schema = new Schema({
    name: String,
    user: String,
    password: String,
    contadores: [Contador.objSchema],
    manometros: [Manometro.objSchema],
    valvulas: [Valvula.objSchema],
    programaciones: [Programacion.objSchema]
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
objSchema.pre<IPulpo>('deleteOne',true,  async function() {
    const objToDel = this;
    await Estado.objModel.deleteMany({ refPulpo: objToDel._id });

});

objSchema.pre< Query<IPulpo> | any >('deleteOne', false, async function() {
    const filtro = this.getQuery();
    const modelo = this.model;
    const objToDel = await modelo.findOne(filtro);
    await Estado.objModel.deleteMany({ refPulpo: objToDel._id });
});

objSchema.pre< Query<IPulpo> | any >('deleteMany', async function() {
    const filtro = this.getQuery();
    const arrObjToDel = await this.model.find(filtro);
    for(let objToDel of arrObjToDel){
        await Estado.objModel.deleteMany({ refPulpo: objToDel._id });
    }
});

let objModel : Model<IPulpo> = model<IPulpo>('Pulpo', objSchema);


export default {
   objModel,
   objSchema
}