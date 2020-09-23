import cfg from './config/config'
import { dbConnect, cacheConnect, express, mongoose } from './modules/core'
import http from 'http'
import { pruebaupdownfile } from './modules/files/file'


// INIT MODULES
import './modules/models'

(async ()=>{

    // INIT MONGODB
    await dbConnect
    // INIT REDIS
    await cacheConnect

    //SERVER
    let server = http.createServer(express)

    server.listen(cfg.http.port)
    server.on('error', ( error ) => console.log('Error server http.', error))
    server.on('listening', () => {
        console.log('Servidor http iniciado en puerto: ' + cfg.http.port)
        console.log(mongoose.models)
        pruebaupdownfile();
    });  

})()
