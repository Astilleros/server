import { Schema, Document, model, Query, Model } from 'mongoose';
import Lectura, { ILectura }  from './lectura.model';


export interface IContador extends Document {
    name: string
};

export interface IContadorInput {
    name: string
};


let objSchema: Schema<IContador> = new Schema<IContador>({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
objSchema.pre<IContador>('deleteOne',true,  async function() {
    const objToDel = this;
    await Lectura.objModel.deleteMany({ refContador: objToDel._id });
});

objSchema.pre< Query<IContador> | any >('deleteOne', false, async function() {
	const filtro = this.getQuery();
	const objToDel = await this.model.findOne(filtro);
	await Lectura.objModel.deleteMany({ refContador: objToDel._id });
});

objSchema.pre< Query<IContador> | any >('deleteMany', async function() {
	const filtro = this.getQuery();
	const arrObjToDel = await this.model.find(filtro);
	for(let objToDel of arrObjToDel){
	    await Lectura.objModel.deleteMany({ refContador: objToDel._id });
	}
});

let objModel : Model<IContador> = model<IContador>('Contador', objSchema);

export default {
	objModel,
	objSchema
}

