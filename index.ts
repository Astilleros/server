import cfg from './config/config';

import type mongoose from 'mongoose';
import {initMongoose} from './modules/core/mongoose';

import type redis from 'redis';
import {initRedisClient} from './modules/core/redis';

import { mngPulpo } from './modules/pulpo/class/pulpo.class';

import { mngGFS } from './modules/filesystem/class/filesystem.class';

import express from 'express';
import { initRoutes } from './routes/index.router';

import http from 'http';


interface I$ {

    cfg: any,
    //  ----------
    app: express.Application | undefined,
    //  ----------
    db: mongoose.Mongoose | undefined,
    //  ----------
    redis: redis.RedisClient | undefined,
    //  ----------
    pulpo: mngPulpo | undefined,
    //  ----------
    gfs: mngGFS | undefined,

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
    //  ----------
    gfs: undefined,

};


(async ()=>{

    // INIT DB
    $.db = await initMongoose($);

    // INICIAMOS REDDIS
    $.redis = await initRedisClient($);

    // INIT MNGPULPO CLASS - CON MONGOOSE Y REDIS DB
    $.pulpo = new mngPulpo($);

    $.gfs = new mngGFS($);


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
