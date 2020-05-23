import { Schema, Document, model } from 'mongoose';
import Presion  from './presion';

export interface IManometro extends Document {
    name: string
};

let ManometroSchema: Schema = new Schema({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});

//Middlewares mongoose
ManometroSchema.pre('deleteOne',{ query: false, document: true },  async function() {
    const objToDel = this;
    await Presion.deleteMany({ manometro_id: objToDel._id });
});

ManometroSchema.pre('deleteOne', { query: true , document: false}, async function() {
const filtro = this.getFilter();
const objToDel = await this.model.findOne(filtro);
await Presion.deleteMany({ manometro_id: objToDel._id });
});

ManometroSchema.pre('deleteMany', async function() {
const filtro = this.getFilter();
const arrObjToDel = await this.model.find(filtro);
for(let objToDel of arrObjToDel){
    await Presion.deleteMany({ manometro_id: objToDel._id });
}
});


let Manometro : model = new model<IManometro>('Manometro', ManometroSchema);
export default Manometro;