import { Schema, Document, model, Types } from 'mongoose';


export interface IPresion extends Document {
    name: string,
    refManometro: any,
    data: number
};


let PresionSchema: Schema = new Schema({
    name: String,
    refManometro: {
        type: Types.ObjectId,
        ref: 'Manometro'
    },
    data: Number
},{
    timestamps: true,
    autoIndex: true,
});


let Presion : model = new model<IPresion>('Presion', PresionSchema);
export default Presion;