import { Schema, Document, model, Query } from 'mongoose';
import Lectura, { ILectura }  from './lectura.model';


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
ContadorSchema.pre<any>('deleteOne',true,  async function() {
    const objToDel = this;
    await Lectura.deleteMany({ refContador: objToDel._id });
});

ContadorSchema.pre<any>('deleteOne', false, async function() {
	const filtro = this.getFilter();
	const objToDel = await this.model.findOne(filtro);
	await Lectura.deleteMany({ refContador: objToDel._id });
});

ContadorSchema.pre<any>('deleteMany', async function() {
	const filtro = this.getFilter();
	const arrObjToDel = await this.model.find(filtro);
	for(let objToDel of arrObjToDel){
	    await Lectura.deleteMany({ refContador: objToDel._id });
	}
});


export default model<IContador>('Contador', ContadorSchema);

