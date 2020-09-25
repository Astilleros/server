import * as expressModule from 'express';
import cfg  from '../../cfg'

// INICIAMOS APP EXPRESS
let express : expressModule.Application = expressModule.default();

express.set('port', cfg.http.port);

// MIDDLEWARES
express.use(expressModule.json());


export { express };