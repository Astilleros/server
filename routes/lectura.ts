import express from 'express';
import multer from 'multer';
import Lectura from '../models/lectura';
import LecturaController from "../controllers/lectura"
import mongoose from 'mongoose';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
 
var upload = multer({ storage: storage });



var router = express.Router();


// SHOW ALL
router.get('/', async function (req, res, next) {

    try {
        let lecturas = await LecturaController.IndexLectura();
        res.send(lecturas);
    } 
    catch ( e ) {
        res.status(400).send(e);
    }

});

// SHOW ID
router.get('/:id', async function (req, res, next) {

    try {
        let lectura = await LecturaController.ShowLectura(req.params.id);
        if(lectura == null) res.status(404).send();
        else res.send(lectura);
    }
    catch ( e ) {
        res.status(400).send(e);
    }

});

// CREATE
router.post('/', async function (req, res, next) {

    try {
        let lectura = await LecturaController.CreateLectura(req.body);
        res.send(lectura);
    }
    catch ( e ) {
        res.status(400).send(e);
    }

});


//UPDATE
router.put('/:id', async function (req, res, next) {

    try {
        let lectura = await LecturaController.UpdateLectura({ _id: req.params.id }, req.body);
        if(lectura == null) res.status(404).send();
        else res.send(lectura);
    } 
    catch ( e ) {
        res.status(400).send(e);
    }
});



// DELETE
router.delete('/:id', async function (req, res, next) {

    try {
        let lectura = await LecturaController.DeleteLectura(req.params.id);
        if(lectura == null) res.status(404).send();
        else res.send(lectura);
    }
    catch ( e ) {
        res.status(400).send(e);
    }
});

// RUTA PARA EL PULPO CON MULTI-PART Y MULTER
router.post('/:refContador', upload.single('photo'), async function (req, res, next) {

    try {
        let lectura = await LecturaController.CreateLectura({
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
