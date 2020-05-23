import { Schema, Document, model } from 'mongoose';

export interface IManometro extends Document {
    name: string
};

let ManometroSchema: Schema = new Schema({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


export default model<IManometro>('Manometro', ManometroSchema);