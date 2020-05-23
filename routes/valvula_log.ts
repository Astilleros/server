import express from 'express';
import ValvulaLog from '../models/valvula_log';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let valvulaLogs = await ValvulaLog.find({});
  res.send(valvulaLogs);

});


export default router;