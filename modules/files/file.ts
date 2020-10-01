import { mongoose } from '../core'
import fs from 'fs'
import mime from 'mime-types'

export let pruebaupdownfile = async () => {
    let readStream = fs.createReadStream('img.png')
    console.log(await File.addFileFromStream( 'filename', readStream ))
    // OK
    console.log(await File.removeFile('5f71ca30858bf81be6be07d1'))

}


class mngFile {

    private GridFile : any;

    async initSchemas() {

        let createModel =  require('mongoose-gridfs').createModel;

        this.GridFile = createModel({
            modelName: 'GridFile',
            connection: mongoose.connection
        });
        
    }

    async getFileInfo( _id : string ) : Promise<any>{
        return await this.GridFile.findOne({ _id })
    }

    async addFileFromStream( filename: string, readableStream: any ) {

        let contentType = mime.lookup(filename);

        return new Promise(async (resolve, reject) => {

            this.GridFile.write({
                filename,
                contentType: contentType,
            },
            readableStream,
            (error: any, objFile: any) => {
                if(error) reject(error)
                else resolve(objFile)
              }
            );
          });

    }
  
    async getFileStream( _id: string ): Promise < any > {
        
        return await this.GridFile.read({ _id });
        
    }

    async copyFile( id: string, filename: string ): Promise < any > {
        
        let fileStream = await this.getFileStream(id)
        return  await this.addFileFromStream( filename, fileStream )

    }
    
  
    async getFileToString(id: string): Promise < string > {
        
      let objReadStream = await this.getFileStream(id);
  
      const chunks: any[] = [];

      return await new Promise((resolve, reject) => {
        objReadStream.on('data', (chunk: any) => chunks.push(chunk));
        objReadStream.on('error', reject);
        objReadStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });

    }
  
  
    async removeFile(_id: string): Promise < any > {

        return await this.GridFile.unlink({ _id }, () => {});
  
    }
  
    async renameFile( _id: string, filename : string ) : Promise< any> {
        
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
  
export let File : mngFile =  new mngFile()