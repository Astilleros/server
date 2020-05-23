import { Schema, Document, model, Types } from 'mongoose';


export interface ILectura extends Document {
    path: string,
    refContador: any,
    data: number
};

export interface ILecturaInput {
    path: string,
    refContador: any,
    data: number
};


let LecturaSchema: Schema = new Schema({
    path: String,
    refContador: {
        type: Types.ObjectId,
        ref: 'Contador'
    },
    data: Number
},{
    timestamps: true,
    autoIndex: true,
});


export default model<ILectura>('Lectura', LecturaSchema);