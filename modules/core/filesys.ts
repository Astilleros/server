import fs from 'fs'
import { mongoose } from '.'

//Falta cachear los getFileInfo en redis.
class mngFile {

    public GridFile : any;
    

    initSchemas(){
        const { createModel } = require('mongoose-gridfs');
        this.GridFile = createModel({
            modelName: 'GridFile',
            connection: mongoose.connection
        })
    }

    initRouter(){

    }

    async getFileInfo( _id : string ) : Promise<mongoose.Model<any> | null>{
        return await this.GridFile.findOne({ _id })
    }

    async addFileFromStream( filename: string, readableStream: any ) : Promise<any> {
  
        return new Promise(async (resolve, reject) => {

            await this.GridFile.write({
                filename: filename,
            },
            readableStream,
            async (error: any, objFile: any) => {
                if (error) 
                    reject(error);
                else
                    resolve(objFile);
            }
            );
        });

    }
  
    async getFileStream( _id: string ): Promise < any > {
        
        let file = await this.GridFile.findOne({ _id });
        return file?.getDownloadStream()
        
    }

    async copyFile( id: string, filename: string ): Promise < mongoose.Model<any> | null > {
        
        let fileStream = await this.getFileStream(id)
        return  await this.addFileFromStream( filename, fileStream )

    }
    
  
    async getFileToString(_id: string): Promise < string > {
        
      let objReadStream = await this.getFileStream(_id);
  
      const chunks: any[] = [];

      return await new Promise((resolve, reject) => {
        objReadStream.on('data', (chunk: any) => chunks.push(chunk));
        objReadStream.on('error', reject);
        objReadStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });

    }
  
  
    async removeFile(_id: string): Promise < mongoose.Model<any> | null > {

        return await this.GridFile.unlink({ _id }, () => {});
  
    }
  
    async renameFile( _id: string, filename : string ) : Promise< mongoose.Model<any> | null> {
        
        return await this.GridFile.findOneAndUpdate(
            { _id }, 
            { filename }, 
            {
                new: true,
                useFindAndModify: false
            }
        );
  
    }

}

export let File = new mngFile();


