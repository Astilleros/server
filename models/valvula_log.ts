import { Schema, Document, model, Types } from 'mongoose';


export interface IValvulaLog extends Document {
    status: string,
    refValvula: any,
};

const ValvulaLogSchema: Schema = new Schema({
    status: String,
    refValvula: {
        type: Types.ObjectId,
        ref: 'Valvula'
    },
},{
    timestamps: true,
    autoIndex: true,
});

let ValvulaLog : model = new model<IValvulaLog>('ValvulaLog', ValvulaLogSchema);
export default ValvulaLog;
