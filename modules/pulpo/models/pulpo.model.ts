import { Document, Model, model, Types, Schema, Query } from "mongoose";


export interface IPulpo extends Document {
    name: string,
    user: string,
    password: string,
//    contadores: Types.DocumentArray<IContador> ,
//    manometros: Types.DocumentArray<IManometro>,
//    valvulas: Types.DocumentArray<IValvula>,
//    programaciones: Types.DocumentArray<IProgramacion>
};

export function initPulpo(params: any ) {



    let objSchema: Schema = new Schema({
        name: String,
        user: String,
        password: String,
//        contadores: [ContadorSchema],
//        manometros: [ManometroSchema],
//        valvulas: [ValvulaSchema],
//        programaciones: [ProgramacionSchema]
    },{
        timestamps: true,
        autoIndex: true,
    });


    //Middlewares mongoose
    objSchema.pre<IPulpo>('deleteOne',true,  async function() {
        const objToDel = this;
        await params.models.Estado.deleteMany({ refPulpo: objToDel._id });
    });

    objSchema.pre<IPulpo>('remove',  async function() {
        const objToDel = this;
        await params.models.Estado.deleteMany({ refPulpo: objToDel._id });
    });

    objSchema.pre< Query<IPulpo > & { model: Model<IPulpo> }  >('deleteOne', false, async function() {
        const filtro = this.getQuery();
        const modelo = this.model;
        const objToDel = await modelo.findOne(filtro);
        if(objToDel != null){
            await params.models.Estado.deleteMany({ refPulpo: objToDel._id });
        }
    });

    objSchema.pre< Query<IPulpo>  & { model: Model<IPulpo> } >('deleteMany', async function() {
        const filtro = this.getQuery();
        const arrObjToDel = await this.model.find(filtro);
        for(let objToDel of arrObjToDel){
            await params.models.Estado.deleteMany({ refPulpo: objToDel._id });
        }
    });

    let objModel : Model<IPulpo> = model<IPulpo>('Pulpo', objSchema);

    return {
        objModel,
        objSchema
    };

}