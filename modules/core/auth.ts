import { app } from '.'
import * as models from '../models'
import jwt from 'jsonwebtoken'
import cfg from '../../cfg/cfg'

export interface tokenPayload {
    id: models.IContacto['_id'],
    arrRol: models.ICredencial['arrRol'],
    arrPermiso: models.ICredencial['arrPermiso']
}

export enum authEnumPermiso {
    usuarioEfectivo = 'usuarioEfectivo'
}

export class mngAuth {
    
    
    initRoutes () {
        app.get('/loggin', this.getJWT)
        app.get('/reloggin', this.middlewareAuth, this.updateJWT)
        app.get('/effective', this.middlewareAuth, this.getArrEfectiveContacto)
        app.get('/effective/:effectiveContacto', this.middlewareAuth, this.getEffectiveJWT)
    }

    async middlewareAuth( req : any, res : any, next : any ) {
        let headerData = req.get('Authorization')
        if (headerData) {
            var token : string = headerData.split(' ')[1]
            try {
                //clockTimestamp: the time in seconds that should be used as the current time for all necessary comparisons.
                let decoded : any = jwt.verify(token, cfg.jwt.key);
                // Aqui va una llamada al Contacto.finById Cacheado.
                req.contacto = await models.Contacto.findById(decoded.id)
                next()
            } catch(err) {
                res.status(401).end()
            }
        }
    }

    async getJWT( req : any, res : any ) {
        let contacto : models.IContacto | null = await models.Contacto.findOne({ 'credencial.usuario' :  req.body.usuario })
        if ( contacto == null || contacto.credencial.contrasena != req.body.contrasena )
            res.status(401).end()
        else {
            console.log('Loggin: ' + contacto.nombre)
            let tokenPayload : tokenPayload = {
                id: contacto._id,
                arrRol: contacto.credencial.arrRol,
                arrPermiso: contacto.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenPayload, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }

    }

    async getArrEfectiveContacto(req:any, res:any){
        // Esto se puede cachear en inmobiliarias por id o personalizarlo
        let arrEffectiveContacto : [models.IContacto] | {} = await models.Contacto.find({
            refInmobiliaria: req.contacto.refInmobiliaria
        })
        console.log('Effective contacts for: ' + req.contacto.nombre)
        res.json(arrEffectiveContacto)
    }

    async getEffectiveJWT( req : any, res : any) {
        //Esta es la comprobacion de permisos, mirare de usar casl o modulillo propio.
        // tipo entrada: function autoriza(['admin', 'agente'], ['usuarioEfectivo', 'P2'])
        //if( req.contacto.credencial.rol.indexOf('admin') == -1 ) {}
        //if( req.contacto.credencial.arrPermiso.indexOf('usuarioEfectivo') == -1 ) {}
        //Tambien que pida un usuario de esta inmobiliaria.
        
        // Aqui va una llamada al Contacto.finById Cacheado.
        let effectiveContacto : models.IContacto | null = await models.Contacto.findById(req.params.effectiveContacto)
        if (effectiveContacto == null)
            res.status(404).end()

        else if(effectiveContacto.refInmobiliaria != req.contacto.refInmobiliaria)
            res.status(401).end()

        else {
            
            let tokenPayload : tokenPayload = {
                id: effectiveContacto._id,
                arrRol: effectiveContacto.credencial.arrRol,
                arrPermiso: effectiveContacto.credencial.arrPermiso
            }
            console.log('Effective loggin: ' + effectiveContacto.nombre)

            let token : string = jwt.sign( tokenPayload, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })

        }
        

    }

    async updateJWT( req : any, res : any ) {
        req.contacto.credencial.username
        
        let contacto : models.IContacto | null = await models.Contacto.findOne({ 'credencial.usuario' :  req.contacto.credencial.usuario })

        if ( contacto == null )
            res.status(404).end()
        else {
            console.log('Reloggin: ' + contacto.nombre)
            let tokenData : tokenPayload = {
                id: contacto._id,
                arrRol: contacto.credencial.arrRol,
                arrPermiso: contacto.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenData, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }
    }


}

export let auth = new mngAuth()