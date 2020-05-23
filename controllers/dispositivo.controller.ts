import mongoose from 'mongoose';


import moment from 'moment-timezone';
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());

import Pulpo, { IPulpo } from '../models/pulpo.model';
import Estado, { IEstado } from '../models/estado.model';
import Contador, { IContador } from '../models/contador.model';
import Lectura, { ILectura } from '../models/lectura.model';
import Manometro, { IManometro } from '../models/manometro.model';
import Presion, { IPresion } from '../models/presion.model';
import Valvula, { IValvula } from '../models/valvula.model';
import ValvulaLog, { IValvulaLog } from '../models/valvula_log.model';
import Programacion, { IProgramacion } from '../models/programacion.model';


async function ShowLectura( objId : mongoose.Types.ObjectId ): Promise<ILectura[]> {
    return  await Lectura.findOne({ _id: objId });
};


async function CreateLectura(objCreate: ILectura): Promise<ILectura> {
    return await Lectura.create(objCreate);
}


async function UpdateLectura( objId: mongoose.Types.ObjectId , objUpdate : ILectura ): Promise<ILectura> {
    return  await Lectura.findOneAndUpdate({ _id: objId }, objUpdate,{ new: true });
};


async function DeleteLectura( objId : mongoose.Types.ObjectId ): Promise<ILectura> {
    return  await Lectura.findByIdAndDelete(objId);
};


async function showTimeUTC() : Promise<any> {
    let nowUTC = moment().utc();
    let date = {
        unix: nowUTC.unix(),
        dia: nowUTC.isoWeekday(),
        hora: nowUTC.hour(),
        minuto: nowUTC.minute()
    }
    return date;
}


export default {
  ShowLectura,
  CreateLectura,
  UpdateLectura,
  DeleteLectura,
  showTimeUTC,
  //showProgramacion,
  saveStatus,
  //savePresion,
  //saveLectura,
  //saveValvulaLog
};