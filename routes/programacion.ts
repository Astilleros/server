import express from 'express';
import Programacion from '../models/programacion';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let programaciones = await Programacion.find({});
  res.send(programaciones);

});


export default router;