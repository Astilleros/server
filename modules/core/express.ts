import * as express from 'express';
import cfg  from '../../cfg/cfg'

// INICIAMOS APP EXPRESS
let app : express.Application = express.default();

app.set('port', cfg.http.port);

// MIDDLEWARES
app.use(express.json());

app.get('/', (req:any, res, any) => {
    res.json({
        app: 'Horus v2',
        status: 'Ok'
    })
})


export { app };