import { Schema, Document, model, Query, Model } from 'mongoose';

export interface IContador extends Document {
    name: string
};

export interface IContadorInput {
    name: string 
};


export function initContador( $: any ) {

	let objSchema: Schema<IContador> = new Schema<IContador>({
		name: String
	},{
		timestamps: true,
		autoIndex: true,
	});


	//Middlewares mongoose
	objSchema.pre<IContador>('deleteOne',true,  async function() {
		const objToDel = this;
		await $.db.models.Lectura.deleteMany({ refContador: objToDel._id });
	});

	objSchema.pre<IContador>('remove',  async function() {
		const objToDel = this;
		await $.db.models.Lectura.deleteMany({ refContador: objToDel._id });
	});

	objSchema.pre< Query<IContador> & { model: Model<IContador> } >('deleteOne', false, async function() {
		const filtro = this.getQuery();
		const objToDel = await this.model.findOne(filtro);
		if(objToDel){
			await $.db.models.Lectura.deleteMany({ refContador: objToDel._id });
		}
	});

	objSchema.pre< Query<IContador> & { model: Model<IContador> } >('deleteMany', async function() {
		const filtro = this.getQuery();
		const arrObjToDel = await this.model.find(filtro);
		for(let objToDel of arrObjToDel){
			await $.db.models.Lectura.deleteMany({ refContador: objToDel._id });
		}
	});

	let objModel : Model<IContador> = model<IContador>('Contador', objSchema);
}

