import { Schema, Document, model } from 'mongoose';


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


let Programacion : model = new model<IProgramacion>('Programacion', ProgramacionSchema);
export default Programacion;