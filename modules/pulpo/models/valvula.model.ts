import { Document, Model, model, Schema } from "mongoose";


export interface IValvula extends Document {
    name: string
};


export function initValvula($: any ) {


	let objSchema: Schema<IValvula> = new Schema<IValvula>({
		name: String
	},{
		timestamps: true,
		autoIndex: true,
	});


	let objModel : Model<IValvula> = model<IValvula>('Valvula', objSchema);

}