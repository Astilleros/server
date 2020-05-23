import { Schema, Document, model } from 'mongoose';

export interface ITimeUTC {
        unix: number,
        dia: number,
        hora: number,
        minuto: number
    };

export interface IProgramacion extends Document {
    data: string,
    running: boolean
};


let ProgramacionSchema: Schema = new Schema({
    data: String,
    running: Boolean
},{
    timestamps: true,
    autoIndex: true,
});


export default model<IProgramacion>('Programacion', ProgramacionSchema);