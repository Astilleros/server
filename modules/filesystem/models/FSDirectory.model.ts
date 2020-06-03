import { Schema, Document, model, Query, Model } from 'mongoose';

export interface IFSDirectory extends Document {
    strName: string,
    refParentDir: IFSDirectory['_id']
};



export function initFSDirectory( $: any ) {

	let objSchema: Schema<IFSDirectory> = new Schema<IFSDirectory>( {
        strName: String,
        refParentDir: {
            type: Schema.Types.ObjectId,
            ref: 'FSDirectory',
        }
    },{
		timestamps: true,
		autoIndex: true,
    });
    
      
    // Mongoose middleware - Cascade delete
    objSchema.pre<IFSDirectory>('remove', true,  async function() {
        const objToDel = this;
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        await $.db.models.FSDirectory.deleteMany({ refParentDir: objToDel._id });
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        await $.db.models.FSFile.deleteMany({ refParentDir: objToDel._id });
    });

    objSchema.pre< Query<IFSDirectory> & { model: Model<IFSDirectory> } >('remove', false, async function() {
        const filtro = this.getQuery();
        const objToDel : IFSDirectory | null  = await this.model.findOne(filtro);
        if(objToDel){
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSDirectory.deleteMany({ refParentDir: objToDel._id });
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSFile.deleteMany({ refParentDir: objToDel._id });
        }
    });
    
    objSchema.pre<IFSDirectory>('deleteOne',true,  async function() {
        const objToDel : any = this;
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        await $.db.models.FSDirectory.deleteMany({ refParentDir: objToDel._id });
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        await $.db.models.FSFile.deleteMany({ refParentDir: objToDel._id });
    });

    objSchema.pre< Query<IFSDirectory> & { model: Model<IFSDirectory> } >('deleteOne', false, async function() {
        const filtro = this.getQuery();
        const objToDel : IFSDirectory | null = await this.model.findOne(filtro);
        if(objToDel){
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSDirectory.deleteMany({ refParentDir: objToDel._id });
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSFile.deleteMany({ refParentDir: objToDel._id });

        } 
    });
    
    objSchema.pre< Query<IFSDirectory> & { model: Model<IFSDirectory> } >('deleteMany', async function() {
        const filtro = this.getQuery();
        const arrObjToDel = await this.model.find(filtro);
        for(let objToDel of arrObjToDel){
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSDirectory.deleteMany({ refParentDir: objToDel._id });
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            await $.db.models.FSFile.deleteMany({ refParentDir: objToDel._id });
        }
        });
      
          
	let objModel : Model<IFSDirectory> = model<IFSDirectory>('FSDirectory', objSchema);
}

