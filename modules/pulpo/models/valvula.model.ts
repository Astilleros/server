import { Document, Model, model, Types, Schema, Query } from "mongoose";


interface IValvula extends Document {
    name: string
};


let objSchema: Schema<IValvula> = new Schema<IValvula>({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


let objModel : Model<IValvula> = model<IValvula>('Valvula', objSchema);

export {
	//models
	objModel as ValvulaModel,
	objSchema as ValvulaSchema,
	//interfaces
	IValvula as IValvula
}