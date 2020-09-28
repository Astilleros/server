import fs from 'fs'
import { mongoose } from '../core'
import { 
    GridFile, IGridFile
 } from '../models'

export let pruebaupdownfile = async () => {

    let File = new mngFile()
    File.removeFile('5f6bcd8e5be6622db85d6f70')

    /*
    let fileupStream = fs.createReadStream('img.png')
 
    let auxfile: IGridFile = new GridFile()

    auxfile.filename = 'file.ext'
    let id = await auxfile.upload(fileupStream)
    console.log(id)
    
    let filedownStream = fs.createWriteStream('img235.png')
    let auxfile2 : IGridFile[] | [] = await GridFile.find({})
    console.log(auxfile2)
    await auxfile2[0]?.download(filedownStream)
    */
}

//Falta cachear los getFileInfo en redis.
class mngFile {

    async getFileInfo( _id : string ) : Promise<IGridFile | null>{
        return await GridFile.findOne({ _id })
    }

    async addFileFromStream( filename: string, readableStream: any ) {
  
        let file: IGridFile = new GridFile()
        file.filename = filename
        return await file.upload(readableStream)

    }
  
    async getFileStream( _id: string ): Promise < any > {
        
        let file = await GridFile.findOne({ _id });
        return file?.getDownloadStream()
        
    }

    async copyFile( id: string, filename: string ): Promise < IGridFile | null > {
        
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
  
  
    async removeFile(_id: string): Promise < IGridFile | null > {

        return await GridFile.findOneAndDelete({ _id });
  
    }
  
    async renameFile( _id: string, filename : string ) : Promise< IGridFile | null> {
        
        return await GridFile.findOneAndUpdate(
            { _id }, 
            { filename }, 
            {
                new: true,
                useFindAndModify: false
            }
        );
  
    }

}
  