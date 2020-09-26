import fs from 'fs'
import { 
    GridFile, IGridFile
 } from '../models'

export let pruebaupdownfile = async () => {

    let fileupStream = fs.createReadStream('img.png')
 
    let auxfile: IGridFile = new GridFile()

    auxfile.filename = 'file.ext'
    let id = await auxfile.upload(fileupStream)
    console.log(id)
    
    let filedownStream = fs.createWriteStream('img235.png')
    let auxfile2 : IGridFile[] | [] = await GridFile.find({})
    console.log(auxfile2)
    await auxfile2[0]?.download(filedownStream)
    
}