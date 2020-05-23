import express from 'express';
import Pulpo from '../models/pulpo';

let router : express.Router = express.Router();

router.get('/', async (req, res, next) => {

  let pulpos = await Pulpo.find({});
  res.send(pulpos);

});


export default router;