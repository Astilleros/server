import { Router } from 'express';

import { IEstado } from "../modules/pulpo/models/estado.model";
import { ILectura } from "../modules/pulpo/models/lectura.model";

export function initPulpoRouter( $: any ) {

    var router = Router();

    // CREATE ESTADO
    router.post('/estado/', async function (req, res, next) {
        try {
            let estado : IEstado = await $.pulpo.saveEstado({
                refPulpo: req.body.id,
                reboot: req.body.reboot,
                batery: req.body.batery,
                signal: req.body.signal,
                presion: req.body.presion,
                temperatura: req.body.temperatura,
                humedad: req.body.humedad
            });
            res.send(estado);
        }
        catch ( e ) {
            res.status(400).send(e);
        }
    });

    return router;
}

