import { Schema, Document, model, Query, Model, Types } from 'mongoose';
import { IFSDirectory } from './FSDirectory.model';

export interface IFSFile extends Document {
        strName: String,
        strContentType: String,
        refParentDir: IFSDirectory['_id'],
        refGridFSFile: any
};


export function initFSFile( $: any ) {

	let objSchema: Schema<IFSDirectory> = new Schema<IFSDirectory>( {
        strName: String,
        strContentType: String,
        refParentDir: {
            type: Schema.Types.ObjectId,
            ref: 'FSDirectory',
        },
        refGridFSFile: {
            type: $.db.Types.ObjectId,
            ref: 'GridFSFile',
        },
    },{
		timestamps: true,
		autoIndex: true,
    });
    
    // Mongoose middleware - Cascade delete
    objSchema.pre<IFSFile>('remove', true,  async function() {
        const objToDel : IFSFile = this;  
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        // Coll: GridFSFile
        await $.db.models.GridFSFile.unlink( { _id: objToDel.refGridFSFile }, () => {} );
    });

    objSchema.pre< Query<IFSFile> & { model: Model<IFSFile> } >('remove', false, async function() {
        const filtro = this.getQuery();
        const objToDel = await this.model.findOne(filtro);    
        if(objToDel){
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            // Coll: GridFSFile
            await $.db.models.GridFSFile.unlink( { _id: objToDel.refGridFSFile }, () => {} );
        }
    });
    
    objSchema.pre<IFSFile>('deleteOne',true,  async function() {
        const objToDel : IFSFile = this;
        // 1-Borrar documentos ajenos con referencia al propio en un campo.
        // Coll: GridFSFile
        await $.db.models.GridFSFile.unlink( { _id: objToDel.refGridFSFile }, () => {} );
    });

    objSchema.pre< Query<IFSFile> & { model: Model<IFSFile> } >('deleteOne', false, async function() {
        const filtro = this.getQuery();
        const objToDel = await this.model.findOne(filtro);
        if(objToDel){
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            // Coll: GridFSFile
            await $.db.models.GridFSFile.unlink( { _id: objToDel.refGridFSFile }, () => {} );
        }
    });
    
    objSchema.pre< Query<IFSFile> & { model: Model<IFSFile> } >('deleteMany', async function() {
        const filtro = this.getQuery();
        const arrObjToDel = await this.model.find(filtro);
        for(let objToDel of arrObjToDel){    
            // 1-Borrar documentos ajenos con referencia al propio en un campo.
            // Coll: GridFSFile
            await $.db.models.GridFSFile.unlink( { _id: objToDel.refGridFSFile }, () => {} );
        }
    });
}