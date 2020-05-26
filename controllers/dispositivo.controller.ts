import mongoose from 'mongoose';


import moment from 'moment-timezone';
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());

import Pulpo, { IPulpo } from '../models/pulpo.model';
import Contador, { IContador, IContadorInput } from '../models/contador.model';
import Valvula, { IValvula } from '../models/valvula.model';
import Manometro, { IManometro } from '../models/manometro.model';
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

async function showProgramacion( refPulpo : mongoose.Types.ObjectId ) : Promise<IProgramacion | undefined> {
    let objPulpo : IPulpo | null  = await Pulpo.objModel.findOne({ _id: refPulpo });
    if (objPulpo == null){
        return undefined;
    }
    let objProgramacion : IProgramacion;
    for ( let programacion of objPulpo.programaciones){
        if(moment.utc().isBetween(moment(programacion.inicio), moment(programacion.final))){
            objProgramacion = programacion;
            return objProgramacion;
        }
    }
}

async function saveEstado(objCreate: IEstadoInput) : Promise<IEstado> {

    return await Estado.objModel.create(objCreate);
}

async function saveLectura(objCreate: ILecturaInput) : Promise<ILectura> {
    return await Lectura.objModel.create(objCreate);
}


async function restartDB() : Promise<Boolean> {
    try {
        await Pulpo.objModel.deleteMany({});
        await Estado.objModel.deleteMany({});
        await Contador.objModel.deleteMany({});
        await Valvula.objModel.deleteMany({});
        await Manometro.objModel.deleteMany({});
        await Programacion.objModel.deleteMany({});
        await Lectura.objModel.deleteMany({});

        let objPulpo : IPulpo = new Pulpo.objModel({
            name: 'PName',
            user: 'PUser',
            password: 'PPassword',
            contadores: [],
            manometros: [],
            valvulas: [],
            programaciones: []
        });

        let objContador : IContador = new Contador.objModel({
            name: 'PContadorName'
        });
        objPulpo.contadores.push(objContador);


        let objValvula : IValvula = new Valvula.objModel({
            name: 'PValvulaName'
        });
        objPulpo.valvulas.push(objValvula);
        
        let objManometro : IManometro = new Manometro.objModel({
            name: 'PManometroName'
        });
        objPulpo.manometros.push(objManometro);

        let objProgramacion : IProgramacion = new Programacion.objModel({
            data: 'JSONDATAPROGRAMACION? O ARRAY DE SUBDOCS ORDENES',
            running: true,
            inicio: new Date(),
            final: new Date()
        });
        objPulpo.programaciones.push(objProgramacion);

////
        await objPulpo.save();

        let objLectura : ILectura = new Lectura.objModel({
            path: 'PPath',
            refContador: objContador._id,
            data: 123
        });
        await objLectura.save();

        let objEstado : IEstado = new Estado.objModel({
            reboot: true,
            batery: 12,
            signal: 13,
            presion: 14,
            temperatura: 15,
            humedad: 16,
            refPulpo: objPulpo._id
        });
        await objEstado.save();

////
        //Elimina todo con sus middlewares
        //await objPulpo.remove();
        //objPulpo.contadores.id(objContador._id).remove();
        await objPulpo.contadores.id(objContador._id).remove();
        await objPulpo.save();
        //await objContador.remove();

        return true;
    } catch (e) {
        return false;
    }
}



export default {
  timeUTC,
  saveEstado,
  saveLectura,
  showProgramacion,
  restartDB
};