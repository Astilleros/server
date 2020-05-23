import express from 'express';
import Contador from '../models/contador';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let contadores = await Contador.find({});
  res.send(contadores);

});


export default router;