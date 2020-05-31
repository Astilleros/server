import { Document, Model, model, Schema } from "mongoose";
import { IPulpo } from '../models/pulpo.model';


export interface IEstado extends Document {
    reboot: boolean,
    batery: number,
    signal: number,
    presion: number,
    temperatura: number,
    humedad: number,
    refPulpo: IPulpo['_id']
};


export function initEstado(params: any ) {


    let objSchema: Schema<IEstado> = new Schema<IEstado>({
        reboot: Boolean,
        batery: Number,
        signal: Number,
        presion: Number,
        temperatura: Number,
        humedad: Number,
        refPulpo: {
            type: Schema.Types.ObjectId,
            ref: 'Pulpo'
        }
    },{
        timestamps: true,
        autoIndex: true,
    });



    let objModel : Model<IEstado> = model<IEstado>('Estado', objSchema);

}
