import { Schema, Document, model, Query, Model } from 'mongoose';
import { LecturaModel, ILectura }  from './lectura.model';


interface IContador extends Document {
    name: string
};

interface IContadorInput {
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
    await LecturaModel.deleteMany({ refContador: objToDel._id });
});

objSchema.pre<IContador>('remove',  async function() {
    const objToDel = this;
    await LecturaModel.deleteMany({ refContador: objToDel._id });
});

objSchema.pre< Query<IContador> & { model: Model<IContador> } >('deleteOne', false, async function() {
	const filtro = this.getQuery();
	const objToDel = await this.model.findOne(filtro);
    if(objToDel != null){
		await LecturaModel.deleteMany({ refContador: objToDel._id });
	}
});

objSchema.pre< Query<IContador> & { model: Model<IContador> } >('deleteMany', async function() {
	const filtro = this.getQuery();
	const arrObjToDel = await this.model.find(filtro);
	for(let objToDel of arrObjToDel){
	    await LecturaModel.deleteMany({ refContador: objToDel._id });
	}
});

let objModel : Model<IContador> = model<IContador>('Contador', objSchema);

export {
	//models
	objModel as ContadorModel,
	objSchema as ContadorSchema,
	//interfaces
	IContador as IContador,
	IContadorInput as IContadorInput
}

