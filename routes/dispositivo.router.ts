import { Router } from 'express';
import multer from 'multer';

import DispositivoController from "../controllers/dispositivo.controller";


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
 
var upload = multer({ storage: storage });



var router = Router();


// SHOW ID
router.get('/utc/', async function (req, res, next) {

    try {
        let lectura = await DispositivoController.timeUTC();
        if(lectura == null) res.status(404).send();
        else res.send(lectura);
    }
    catch ( e ) {
        res.status(400).send(e);
    }

});

// CREATE ESTADO


router.post('/estado/', async function (req, res, next) {
    try {
        let objIEstado : IEstado = new Estado()
        await DispositivoController.saveEstado({
            refPulpo: req.body.id,
            reboot: req.body.reboot,
            batery: req.body.batery,
            signal: req.body.signal,
            presion: req.body.presion,
            temperatura: req.body.temperatura,
            humedad: req.body.humedad
        });
    }
    catch ( e ) {
        res.status(400).send(e);
    }
});



// RUTA PARA EL PULPO CON MULTI-PART Y MULTER
router.post('/lectura/:refContador', upload.single('photo'), async function (req, res, next) {

    try {
        let lectura = await DispositivoController.saveLectura({
            path: req.file.destination + req.file.filename,
            refContador: req.body.refContador,
            data: -1
        });
        res.send(lectura);
    }
    catch ( e ) {
        res.status(400).send(e);
    }

});

export default router;
