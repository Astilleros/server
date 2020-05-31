import { initPulpo , IPulpo } from '../models/pulpo.model';
import { initEstado, IEstado} from '../models/estado.model';
import { initProgramacion, IProgramacion, ITimeUTC } from '../models/programacion.model';
import { initValvula } from '../models/valvula.model';
import { initManometro } from '../models/manometro.model';
import { initContador }  from '../models/contador.model';
import { initLectura, ILectura, ILecturaInput }  from '../models/lectura.model';


import moment from 'moment-timezone';

interface ISaveEstadoInput {
    reboot: boolean,
    batery: number,
    signal: number,
    presion: number,
    temperatura: number,
    humedad: number,
    refPulpo: IPulpo['_id']
};

export class mngPulpo { 

    public constructor( private $ : any ){
        initLectura($);
        initContador($);
        initProgramacion($);
        initValvula($);
        initManometro($);
        initEstado($);
        initPulpo($);
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


    public async showProgramacion( refPulpo : IPulpo['_id'] ) : Promise<IProgramacion | undefined> {
        let objPulpo : IPulpo | null  = await this.$.db.models.Pulpo.findOne({ _id: refPulpo });
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

    public async saveLectura(objCreate: ILecturaInput) : Promise<ILectura> {
        return await this.$.db.models.Lectura.create(objCreate);
    }

    public async saveEstado(objCreate: ISaveEstadoInput) : Promise<IEstado> {
        return await this.$.db.models.Estado.create(objCreate);
    }

}

