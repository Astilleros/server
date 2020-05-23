import express from 'express';
import Valvula from '../models/valvula';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let valvulas = await Valvula.find({});
  res.send(valvulas);

});


export default router;