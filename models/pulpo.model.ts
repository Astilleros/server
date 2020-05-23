import { Schema, Document, model, Types } from 'mongoose';
import Valvula  from './valvula.model';
import Manometro  from './manometro.model';
import Contador  from './contador.model';
import Programacion  from './programacion.model';


export interface IPulpo extends Document {
    name: string,
    user: string,
    password: string,
    contadores: any[],
    manometros: any[],
    valvulas: any[],
    programaciones: any[]
};


let PulpoSchema: Schema = new Schema({
    name: String,
    user: String,
    password: String,
    contadores: [{
        type: Types.ObjectId,
        ref: 'Contador'
    }],
    manometros: [{
        type: Types.ObjectId,
        ref: 'Manometro'
    }],
    valvulas: [{
        type: Types.ObjectId,
        ref: 'Valvula'
    }],
    programaciones: [{
        type: Types.ObjectId,
        ref: 'Programacion'
    }]
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
PulpoSchema.pre('deleteOne',{ query: false, document: true },  async function() {
        const objToDel = this;
        await Contador.deleteMany({_id: objToDel.contadores});
        await Manometro.deleteMany({_id: objToDel.manometros});
        await Valvula.deleteMany({_id: objToDel.valvulas});
        await Programacion.deleteMany({_id: objToDel.programaciones});
});

PulpoSchema.pre('deleteOne', { query: true , document: false}, async function() {
    const filtro = this.getFilter();
    const objToDel = await this.model.findOne(filtro);
    await Contador.deleteMany({_id: objToDel.contadores});
    await Manometro.deleteMany({_id: objToDel.manometros});
    await Valvula.deleteMany({_id: objToDel.valvulas});
    await Programacion.deleteMany({_id: objToDel.programaciones});
});

PulpoSchema.pre('deleteMany', async function() {
    const filtro = this.getFilter();
    const arrObjToDel = await this.model.find(filtro);
    for(let objToDel of arrObjToDel){
        await Contador.deleteMany({_id: objToDel.contadores});
        await Manometro.deleteMany({_id: objToDel.manometros});
        await Valvula.deleteMany({_id: objToDel.valvulas});
        await Programacion.deleteMany({_id: objToDel.programaciones});
    }
});


let Pulpo : model = new model<IPulpo>('Pulpo', PulpoSchema);
export default Pulpo;