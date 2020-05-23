import { Schema, Document, model } from 'mongoose';
import Lectura  from './lectura';


export interface IContador extends Document {
    name: string
};


let ContadorSchema: Schema = new Schema({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
ContadorSchema.pre('deleteOne',{ query: false, document: true },  async function() {
    const objToDel = this;
    await Lectura.deleteMany({ contador_id: objToDel._id });
});

ContadorSchema.pre('deleteOne', { query: true , document: false}, async function() {
	const filtro = this.getFilter();
	const objToDel = await this.model.findOne(filtro);
	await Lectura.deleteMany({ contador_id: objToDel._id });
});

ContadorSchema.pre('deleteMany', async function() {
	const filtro = this.getFilter();
	const arrObjToDel = await this.model.find(filtro);
	for(let objToDel of arrObjToDel){
	    await Lectura.deleteMany({ contador_id: objToDel._id });
	}
});


export default model<IContador>('Contador', ContadorSchema);

