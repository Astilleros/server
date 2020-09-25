import * as models from '../models'
import jwt from 'jsonwebtoken'
import express from 'express'
import cfg from '../../cfg'

export interface Token {
    id: models.IContacto['_id'],
    rol: models.ICredencial['rol'],
    arrPermiso: models.ICredencial['arrPermiso']
}

export enum authPermisos {
    usuarioEfectivo = 'usuarioEfectivo'
}

class IAuth {
/*
    //Actualiza el usuario, contraseña y permisos de un usuario.
    patchCredenciales( id : models.IContacto['_id'], credencial : models.ICredencial ) : models.ICredencial {
        return new models.Credencial(credencial);
    }
*/

    //middlware valida token y carga contacto conectado
    middlewareAuth( req : any, res : any, next : any ) : void {
        let token = req.get('Authorization')
        if (token) {
            try {
                //clockTimestamp: the time in seconds that should be used as the current time for all necessary comparisons.
                var decoded : any = jwt.verify(token, cfg.jwt.key);
                // Aqui va una llamada al Contacto.finById Cacheado.
                req.contacto = models.Contacto.findById(decoded.id)
                next()
            } catch(err) {
                res.status(401).end()
            }
        }
    }

    //Genera un token a traves de credenciales
    // ruta: /loggin
    async getJWT( req : any, res : any ) {

        let contacto : models.IContacto | null = await models.Contacto.findOne({ 'credencial.usuario' :  req.body.username })

        if ( contacto == null || contacto.credencial.contrasena != req.body.password )
            res.status(401).end()
        else {
            let tokenData : Token = {
                id: contacto._id,
                rol: contacto.credencial.rol,
                arrPermiso: contacto.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenData, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }

    }


    //Usuarios efectivos
    // ruta /efective
    // protegida por middlewareAuth y por permiso contactosEfectivos
    async getArrEfectiveContacto(req:any, res:any){
        // Esto se puede cachear en inmobiliarias por id
        let arrEffectiveContacto : [models.IContacto] | {} = models.Contacto.find({
            refInmobiliaria: req.contacto.refInmobiliaria
        })
        res.json(arrEffectiveContacto)
    }

    // ruta /effective/:id
    async getEffectiveJWT( req : any, res : any) {
        //Esta es la comprobacion de permisos, mirare de usar casl o modulillo propio.
        //if( req.contacto.credencial.rol.indexOf('admin') == -1 ) {}
        //if( req.contacto.credencial.arrPermiso.indexOf('usuarioEfectivo') == -1 ) {}
        //Tambien que pida un usuario de esta inmobiliaria.
        
        // Aqui va una llamada al Contacto.finById Cacheado.
        let effectiveContacto : models.IContacto | null = await models.Contacto.findById(req.body.effectiveContacto)
        if (effectiveContacto == null)
            res.status(404).end()

        else if(effectiveContacto.refInmobiliaria != req.contacto.refInmobiliaria)
            res.status(401).end()

        else {
            
            let tokenData : Token = {
                id: effectiveContacto._id,
                rol: effectiveContacto.credencial.rol,
                arrPermiso: effectiveContacto.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenData, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })

        }
        

    }

    //Genera otro token actualizado en ttl del mismo usuario.
    // ruta /reloggin
    // protegida por el middlewareAuth
    async updateJWT( req : any, res : any ) {
        req.contacto.credencial.username
        
        let contacto : models.IContacto | null = await models.Contacto.findOne({ 'credencial.usuario' :  req.contacto.credencial.username })

        if ( contacto == null )
            res.status(404).end()
        else {
            let tokenData : Token = {
                id: contacto._id,
                rol: contacto.credencial.rol,
                arrPermiso: contacto.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenData, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }
    }


}
