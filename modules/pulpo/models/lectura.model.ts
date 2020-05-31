import { Schema, Document, model, Types, Model } from 'mongoose';
import { IContador } from './contador.model';


export interface ILectura extends Document {
    path: string,
    refContador: IContador['_id'],
    data: number
};

export interface ILecturaInput {
    path: string,
    refContador: IContador['_id'],
    data: number
};

export function initLectura($: any ) {

    let objSchema: Schema<ILectura> = new Schema<ILectura>({
        path: String,
        refContador: {
            type: Schema.Types.ObjectId,
            ref: 'Contador'
        },
        data: Number
    },{
        timestamps: true,
        autoIndex: true,
    });



    let objModel : Model<ILectura> = model<ILectura>('Lectura', objSchema);

}
