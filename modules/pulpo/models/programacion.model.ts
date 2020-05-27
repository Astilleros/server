import { Document, Model, model, Schema } from "mongoose";

interface ITimeUTC {
        unix: number,
        dia: number,
        hora: number,
        minuto: number
    };

interface IProgramacion extends Document {
    data: string,
    running: boolean
    inicio: Date,
    final: Date
};


let objSchema: Schema<IProgramacion> = new Schema<IProgramacion>({
    data: String,
    running: Boolean,
    inicio: Date,
    final: Date
},{
    timestamps: true,
    autoIndex: true,
});


let objModel : Model<IProgramacion> = model<IProgramacion>('Programacion', objSchema);


export {
    //models
    objModel as ProgramacionModel,
    objSchema as ProgramacionSchema,
    //interfaces
    IProgramacion as IProgramacion,
    ITimeUTC as ITimeUTC
}