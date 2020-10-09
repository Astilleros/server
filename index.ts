import cfg from './cfg/cfg'
import { dbConnect, cacheConnect, app, auth, mongoose } from './modules/core'
import http from 'http'
import { File } from './modules/core/filesys'
import fs from 'fs'
import { pruebas } from './modules/expediente/stage_prospecto'


(async ()=>{

    // INIT MONGODB
    await dbConnect
    // INIT REDIS
    await cacheConnect

    // Models
    File.initSchemas()

    //Routes
    auth.initRoutes()
    
    //SERVER
    let server = http.createServer(app)

    server.listen(cfg.http.port)
    server.on('error', ( error ) => console.log('Error server http.', error))
    server.on('listening', async () => {
        console.log('Servidor http iniciado en puerto: ' + cfg.http.port)
        console.log(mongoose.models)
        
        //let localFileStream = fs.createReadStream('img.png')
        //let file = await File.addFileFromStream('img.png', localFileStream)
        //console.log(file)
        //await File.removeFile(file._id)
        //pruebas();
    });  

})()
