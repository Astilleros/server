import { Document, Model, model, Types, Schema, Query } from "mongoose"

export interface ITimeUTC {
        unix: number,
        dia: number,
        hora: number,
        minuto: number
    };

export interface IProgramacion extends Document {
    data: string,
    running: boolean
    inicio: Date,
    final: Date
};


let ProgramacionSchema: Schema = new Schema({
    data: String,
    running: Boolean,
    inicio: Date,
    final: Date
},{
    timestamps: true,
    autoIndex: true,
});


export default model<IProgramacion>('Programacion', ProgramacionSchema);