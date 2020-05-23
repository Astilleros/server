import { Schema, Document, model } from 'mongoose';
import ValvulaLog  from './valvula_log';


export interface IValvula extends Document {
    name: string
};


let ValvulaSchema: Schema = new Schema({
    name: String
},{
    timestamps: true,
    autoIndex: true,
});


//Middlewares mongoose
ValvulaSchema.pre('deleteOne',{ query: false, document: true },  async function() {
        const objToDel = this;
        await ValvulaLog.deleteMany({ valvula_id: objToDel._id });
});

ValvulaSchema.pre('deleteOne', { query: true , document: false}, async function() {
    const filtro = this.getFilter();
    const objToDel = await this.model.findOne(filtro);
    await ValvulaLog.deleteMany({ valvula_id: objToDel._id });
});

ValvulaSchema.pre('deleteMany', async function() {
    const filtro = this.getFilter();
    const arrObjToDel = await this.model.find(filtro);
    for(let objToDel of arrObjToDel){
        await ValvulaLog.deleteMany({ valvula_id: objToDel._id });
    }
});


let Valvula : model = new model<IValvula>('Valvula', ValvulaSchema);
export default Valvula;