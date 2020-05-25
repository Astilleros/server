import express from 'express';


// Inicializamos mongoose
import dbConnect from './config/db';
let db = dbConnect();

// Traemos routers.
import pulpoRouter from './routes/dispositivo.router';



const app : express.Application = express();


// MIDDLEWARES
app.use(express.json());
//app.use(express.urlencoded({ extended: false })); // No vamos a aceptar urlencode post.

// ROUTERS
app.use('/', pulpoRouter);


export default app;



