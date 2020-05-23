import express from 'express';
import Presion from '../models/presion';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let presiones = await Presion.find({});
  res.send(presiones);

});


export default router;