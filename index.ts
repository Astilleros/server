import objConfig from './config/config';

import mongoose from 'mongoose';
import redis from 'redis';

import express from 'express';
import { Routes } from './routes/index.router';

import http from 'http';


// en futura clase core/mongoose con params arrService_ModParams, que cargue el cliente en este singleton object with dependencies.
let initMongoose = async () : Promise<mongoose.Mongoose> => {

    let objMongoose : mongoose.Mongoose = await mongoose.connect(objConfig.arrConfig_Mongodb.strConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    objMongoose.set('useCreateIndex', true);

    objMongoose.connection.on('connected', function() {
        console.log("[Service] - Connected to MongoDB server.\n");
    });
    objMongoose.connection.on('error', function( err: any ) {
        console.log("[Service] - Error on MongoDB connection.");
        console.log( err );
        process.exit(0);
    } );

    objMongoose.connection.on('disconnected', function() {
        console.log("[Service] - Disconnected from MongoDB server.\n");
        process.exit(0);
    } );


    // initSchema() => carga de todos los modelos e interfaces "fuera de las clases".

    return objMongoose;
};

// CAMBIO POR core/mngCACHE OOOOO en futura clase core/reddis con params arrService_ModParams, que cargue el cliente en este singleton object with dependencies.
let inicializaReddis = () : redis.RedisClient =>{
    const client = redis.createClient(
        objConfig.arrConfig_RedisServer.intPort,
        objConfig.arrConfig_RedisServer.strHost
      );
 
    client.on("error", function(error) {
      console.error(error);
    });

    return client;
}

// en futura clase core/express con params arrService_ModParams, que cargue la app en este singleton object with dependencies.
let initExpressApp = () : express.Application =>{

    const app  : express.Application = express();

    app.set('port', objConfig.arrConfig_WebService.intHttpPort);

    // MIDDLEWARES
    app.use(express.json());

    // ROUTERS
    Routes(app);

    return app;
}

let initHttp = () =>{

    let server = http.createServer(arrService_ModParams.objExpress);

    server.listen(objConfig.arrConfig_WebService.intHttpPort);
    server.on('error', () => console.log('error server http.'));
    server.on('listening', () => console.log('escuchando...'));

    return server;
}

var arrService_ModParams: any = {
    //  ----------
    objExpress: undefined,
    //  ----------
    objMongoose: undefined,
    //  ----------
    objClientReddis: undefined,
    //  ----------
    arrCore: {},
    arrModel: {},
    arrServices: {},
};



// MAIN
(async ()=>{
    arrService_ModParams.objMongoose = await initMongoose();
    //arrService_ModParams.objClientReddis = await inicializaReddis();
    arrService_ModParams.objExpress = initExpressApp();
    var serverHttp = initHttp();
})()
