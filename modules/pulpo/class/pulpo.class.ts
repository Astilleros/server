import { Types } from 'mongoose';
import { dbInstance } from '../../../config/db';
import moment from 'moment-timezone';
//moment.tz.setDefault("Europe/Madrid");
//let date = moment().tz("America/Toronto");
//let date = moment().tz("Europe/Madrid");
//console.log(date.utc().format());
//console.log(moment().isoWeekday());

import { PulpoModel, PulpoSchema, IPulpo } from '../models/pulpo.model';
import { ContadorModel, IContador, IContadorInput } from '../models/contador.model';
import { ValvulaModel, IValvula } from '../models/valvula.model';
import { ManometroModel, IManometro } from '../models/manometro.model';
import { EstadoModel, IEstado, IEstadoInput } from '../models/estado.model';
import { LecturaModel, ILectura, ILecturaInput } from '../models/lectura.model';
import { ProgramacionModel, IProgramacion, ITimeUTC } from '../models/programacion.model';

 
//https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#private-and-protected-constructors
//https://medium.com/@lazlojuly/are-node-js-modules-singletons-764ae97519af
//https://dev.to/elasticrash/nodejs-singleton-injector-24n5
class Pulpo { 

    public constructor(){
    }

    public timeUTC() : ITimeUTC {
        let momentUTC : moment.Moment = moment().utc();
        let ITimeUTC : ITimeUTC = {
            unix: momentUTC.unix(),
            dia: momentUTC.isoWeekday(),
            hora: momentUTC.hour(),
            minuto: momentUTC.minute()
        };
        return ITimeUTC;
    }

    public async showProgramacion( refPulpo : Types.ObjectId ) : Promise<IProgramacion | undefined> {
        let objPulpo : IPulpo | null  = await PulpoModel.findOne({ _id: refPulpo });
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

    public async saveEstado(objCreate: IEstadoInput) : Promise<IEstado> {
        let db = dbInstance();
        console.log(db);
        //return await EstadoModel.create(objCreate);
        return await db?.models.Pulpo.create(objCreate);
    }

    public async saveLectura(objCreate: ILecturaInput) : Promise<ILectura> {
        return await LecturaModel.create(objCreate);
    }


    public async restartDB() : Promise<Boolean> {
        try {
            await PulpoModel.deleteMany({});
            await EstadoModel.deleteMany({});
            await ContadorModel.deleteMany({});
            await ValvulaModel.deleteMany({});
            await ManometroModel.deleteMany({});
            await ProgramacionModel.deleteMany({});
            await LecturaModel.deleteMany({});

            let objPulpo : IPulpo = new PulpoModel({
                name: 'PName',
                user: 'PUser',
                password: 'PPassword',
                contadores: [],
                manometros: [],
                valvulas: [],
                programaciones: []
            });

            let objContador : IContador = new ContadorModel({
                name: 'PContadorName'
            });
            objPulpo.contadores.push(objContador);


            let objValvula : IValvula = new ValvulaModel({
                name: 'PValvulaName'
            });
            objPulpo.valvulas.push(objValvula);
            
            let objManometro : IManometro = new ManometroModel({
                name: 'PManometroName'
            });
            objPulpo.manometros.push(objManometro);

            let objProgramacion : IProgramacion = new ProgramacionModel({
                data: 'JSONDATAPROGRAMACION? O ARRAY DE SUBDOCS ORDENES',
                running: true,
                inicio: new Date(),
                final: new Date()
            });
            objPulpo.programaciones.push(objProgramacion);

            await objPulpo.save();

            let objLectura : ILectura = new LecturaModel({
                path: 'PPath',
                refContador: objContador._id,
                data: 123
            });
            await objLectura.save();

            let objEstado : IEstado = new EstadoModel({
                reboot: true,
                batery: 12,
                signal: 13,
                presion: 14,
                temperatura: 15,
                humedad: 16,
                refPulpo: objPulpo._id
            });
            await objEstado.save();

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

}

export default new Pulpo();
