import { Schema, Document, model, Types } from 'mongoose';


export interface IEstado extends Document {
    reboot: boolean,
    batery: number,
    signal: number,
    refContador: any
};


let EstadoSchema: Schema = new Schema({
    reboot: Boolean,
    batery: Number,
    signal: Number,
    refPulpo: {
        type: Types.ObjectId,
        ref: 'Pulpo'
    }
},{
    timestamps: true,
    autoIndex: true,
});


export default model<IEstado>('Estado', EstadoSchema);