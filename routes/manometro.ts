import express from 'express';
import Manometro from '../models/manometro';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let manometros = await Manometro.find({});
  res.send(manometros);

});


export default router;