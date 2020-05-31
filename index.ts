import cfg from './config/config';

import {initMongoose, IMongoose} from './modules/core/mongoose';

//import {initRedis} from './modules/core/redis';

import {mngPulpo} from './modules/pulpo/class/pulpo.class'

import express from 'express';
import { initRoutes } from './routes/index.router';

import http from 'http';


interface I$ {

    cfg: any,
    //  ----------
    app: express.Application | undefined,
    //  ----------
    db: IMongoose | undefined,
    //  ----------
    redis: any | undefined,
    //  ----------
    pulpo: mngPulpo | undefined,

}

var $: I$ = {

    cfg: cfg,
    //  ----------
    app: undefined,
    //  ----------
    db: undefined,
    //  ----------
    redis: undefined,
    //  ----------
    pulpo: undefined,

};


(async ()=>{

    // INIT DB
    $.db = await initMongoose($);

    // INICIAMOS REDDIS
    //$.redis = await inicializaReddis();

    // INIT MNGPULPO CLASS - CON MONGOOSE Y REDIS DB
    $.pulpo = new mngPulpo($);


    // INICIAMOS APP EXPRESS
    $.app = express();

    $.app.set('port', $.cfg.http.port);

    // MIDDLEWARES
    $.app.use(express.json());

    // ROUTERS
    initRoutes($);


    //SERVER
    let server = http.createServer($.app);

    server.listen($.cfg.http.port);
    server.on('error', () => console.log('error server http.'));
    server.on('listening', () => console.log('escuchando...'));


    console.log($.db);
})()
