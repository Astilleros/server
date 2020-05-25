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
    contadores: IContador[],
    manometros: IManometro[],
    valvulas: IValvula[],
    programaciones: IProgramacion[]
};


let PulpoSchema: Schema = new Schema({
    name: String,
    user: String,
    password: String,
    contadores: [Contador],
    manometros: [Manometro],
    valvulas: [Valvula],
    programaciones: [Programacion]
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
PulpoSchema.pre<IPulpo>('deleteOne',true,  async function() {
    const objToDel = this;
    await Estado.deleteMany({ refPulpo: objToDel._id });

});

PulpoSchema.pre< Query<IPulpo> | any >('deleteOne', false, async function() {
    const filtro = this.getQuery();
    const modelo = this.model;
    const objToDel = await modelo.findOne(filtro);
    await Estado.deleteMany({ refPulpo: objToDel._id });
});

PulpoSchema.pre< Query<IPulpo> | any >('deleteMany', async function() {
    const filtro = this.getQuery();
    const arrObjToDel = await this.model.find(filtro);
    for(let objToDel of arrObjToDel){
        await Estado.deleteMany({ refPulpo: objToDel._id });
    }
});

export default model<IPulpo>('Pulpo', PulpoSchema);