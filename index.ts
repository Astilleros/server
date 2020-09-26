import cfg from './cfg/cfg'
import { dbConnect, cacheConnect, app, auth } from './modules/core'
import http from 'http'


// INIT MODULES
import './modules/models'

(async ()=>{

    // INIT MONGODB
    await dbConnect
    // INIT REDIS
    await cacheConnect

    //Routes
    auth.initRoutes()
    
    //SERVER
    let server = http.createServer(app)

    server.listen(cfg.http.port)
    server.on('error', ( error ) => console.log('Error server http.', error))
    server.on('listening', () => {
        console.log('Servidor http iniciado en puerto: ' + cfg.http.port)
    });  

})()
