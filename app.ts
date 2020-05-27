import express from 'express';
import config from './config/config';


// Inicializamos mongoose con mongodb
import dbConnect from './config/db';
dbConnect(config.mongodb_server);

// Traemos routers.
//import pulpoRouter from './routes/pulpo.router';
import { Routes } from './routes/index.router';



const app : express.Application = express();


// MIDDLEWARES
app.use(express.json());
//app.use(express.urlencoded({ extended: false })); // No vamos a aceptar urlencode post.

// ROUTERS
Routes(app);


export default app;



