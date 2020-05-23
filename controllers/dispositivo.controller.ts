import mongoose from 'mongoose';


import moment from 'moment-timezone';
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());

import Pulpo, { IPulpo } from '../models/pulpo.model';
import Estado, { IEstado, IEstadoInput } from '../models/estado.model';
import Lectura, { ILectura, ILecturaInput } from '../models/lectura.model';
import Programacion, { IProgramacion, ITimeUTC } from '../models/programacion.model';


async function timeUTC() : Promise<ITimeUTC> {
    let nowUTC : moment.Moment = moment().utc();
    let date : ITimeUTC = {
        unix: nowUTC.unix(),
        dia: nowUTC.isoWeekday(),
        hora: nowUTC.hour(),
        minuto: nowUTC.minute()
    };
    return date;
}

async function saveEstado(objCreate: IEstadoInput) : Promise<IEstado> {

    return await Estado.create(objCreate);
}

async function saveLectura(objCreate: ILecturaInput) : Promise<ILectura> {
    return await Lectura.create(objCreate);
}


export default {
  timeUTC,
  saveEstado,
  saveLectura,
};