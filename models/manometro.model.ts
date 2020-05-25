import { Schema, Document, model, Model } from 'mongoose';


export interface IManometro extends Document {
    name: string
};

let objSchema: Schema<IManometro> = new Schema<IManometro>({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


 let objModel : Model<IManometro> = model<IManometro>('Manometro', objSchema);


export default {
	objModel,
	objSchema
}