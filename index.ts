import cfg from './config/config';
import * as core from './modules/core/index';
import http from 'http';


(async ()=>{

    // INIT MONGODB
    let mongoose = await core.dbConnect;
    // INIT REDIS
    let redis = await core.cacheConnect;

    //console.log(util.inspect(core, { getters: true }));
    //console.log(util.inspect(core.dbConnect, { getters: true }));
    //console.log(util.inspect(core.cacheConnect, { getters: true }));
    //console.log(util.inspect(core.express, { getters: true }));

    //SERVER
    let server = http.createServer(core.express);

    server.listen(cfg.http.port);
    server.on('error', ( error ) => console.log('Error server http.', error));
    server.on('listening', () => {
        console.log('Servidor http iniciado.');
    });  

})()
