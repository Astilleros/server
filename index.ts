import cfg from './cfg/cfg'
import { dbConnect, cacheConnect, app, auth, mongoose } from './modules/core'
import http from 'http'
import {pruebaupdownfile, File} from './modules/files/file'


(async ()=>{

    // INIT MONGODB
    await dbConnect
    // INIT REDIS
    await cacheConnect

    // INIT MODULES
    let models = import('./modules/models')

    // Models
    File.initSchemas()

    //Routes
    auth.initRoutes()
    
    //SERVER
    let server = http.createServer(app)

    server.listen(cfg.http.port)
    server.on('error', ( error ) => console.log('Error server http.', error))
    server.on('listening', () => {
        console.log('Servidor http iniciado en puerto: ' + cfg.http.port)
        console.log(mongoose.models)
        pruebaupdownfile()
        
    });  

})()
