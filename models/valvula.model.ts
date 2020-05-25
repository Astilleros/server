import { Document, Model, model, Types, Schema, Query } from "mongoose";


export interface IValvula extends Document {
    name: string
};


let objSchema: Schema<IValvula> = new Schema<IValvula>({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


let objModel : Model<IValvula> = model<IValvula>('Valvula', objSchema);


export default {
   objModel,
   objSchema
}