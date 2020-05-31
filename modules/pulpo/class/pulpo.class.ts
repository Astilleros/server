import { initPulpo , IPulpo } from '../models/pulpo.model';
import { initEstado, IEstado, IEstadoInput} from '../models/estado.model';

export class mngPulpo { 

    public constructor( private $ : any ){
        initPulpo($);
        initEstado($);
    }

    public async saveEstado(objCreate: IEstadoInput) : Promise<IEstado> {
        return await this.$.db.models.Estado.create(objCreate);
    }

}

