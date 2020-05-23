import express from 'express';

// Inicializamos mongoose
//import mongoose from './config/db';
import config from './config/config';
import dbConnect from './config/db';

let db = dbConnect();

// Traemos routers.
import pulpoRouter from './routes/pulpo';
import contadorRouter from './routes/contador';
import lecturaRouter from './routes/lectura';
import manometroRouter from './routes/manometro';
import presionRouter from './routes/presion';
import valvulaRouter from './routes/valvula';
import valvulaLogRouter from './routes/valvula_log';
import programacionRouter from './routes/programacion';

/*
mongoose.connect(config.mongodb_server, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on("disconnected", console.error.bind(console, 'MongoDB connection stopped'));
*/


const app : express.Application = express();


// MIDDLEWARES
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

// ROUTERS
app.use('/pulpo', pulpoRouter);
app.use('/contador', contadorRouter);
app.use('/lectura', lecturaRouter);
app.use('/manometro', manometroRouter);
app.use('/presion', presionRouter);
app.use('/valvula', valvulaRouter);
app.use('/valvula_log', valvulaLogRouter);
app.use('/programacion', programacionRouter);


export default app;



