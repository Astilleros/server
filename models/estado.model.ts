import { Schema, Document, model, Types } from 'mongoose';


export interface IEstado extends Document {
    reboot: boolean,
    batery: number,
    signal: number,
    presion: number,
    temperatura: number,
    humedad: number,
    refPulpo: any
};

export interface IEstadoInput {
    reboot: boolean,
    batery: number,
    signal: number,
    presion: number,
    temperatura: number,
    humedad: number,
    refPulpo: any
};


let EstadoSchema: Schema = new Schema({
    reboot: Boolean,
    batery: Number,
    signal: Number,
    presion: Number,
    temperatura: Number,
    humedad: Number,
    refPulpo: {
        type: Types.ObjectId,
        ref: 'Pulpo'
    }
},{
    timestamps: true,
    autoIndex: true,
});


export default model<IEstado>('Estado', EstadoSchema);