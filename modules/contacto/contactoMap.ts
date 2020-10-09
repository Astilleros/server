
import { IMapper } from '../utils'
import { IContacto } from "./contactoRepo";
import { IContactoDTO } from "./contactoDTO";

export class contactoMap implements IMapper<IContacto> {

    public toDomain( raw: any ) : IContacto {
    }

    public toPersistence( contacto: IContacto ) : any {
    }

    public toDTO( contacto: IContacto ) : IContactoDTO {
    }

}