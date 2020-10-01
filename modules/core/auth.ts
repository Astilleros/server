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
        app.get('/loggin', this.loggin)
        app.get('/reloggin', this.authMiddleware, this.reloggin)
        app.get('/effective', this.authMiddleware, this.getArrEfectiveUsuario)
        app.get('/effective/:effectiveUsuario', this.authMiddleware, this.getEffectiveUsuarioJWT)
    }

    async authMiddleware( req : any, res : any, next : any ) {
        req.header("Access-Control-Allow-Origin", "*");
        req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
        let headerData = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization']

        if (headerData == undefined) {
            res.status(401).end("Need JWT.")
        }
        else {
            var token : string = headerData.split(' ')[1]
            try {
                //clockTimestamp: the time in seconds that should be used as the current time for all necessary comparisons.
                let decoded : any = jwt.verify(token, cfg.jwt.key);
                // Aqui va una llamada al Contacto.finById Cacheado.
                req.usuario = await models.Usuario.findOne({ _id: decoded.id }, '-credencial.contrasena')
                next()
            } catch(err) {
                res.status(401).end("Invalid JWT.")
            }
        }
    }

    async loggin( req : any, res : any ) {
        let usuario : models.IUsuario | null = await models.Usuario.findOne({ 'credencial.usuario' :  req.body.usuario })
        if ( usuario == null || usuario.credencial.contrasena != req.body.contrasena )
            res.status(401).end()
        else {
            console.log('Loggin: ' + usuario.nombre)
            let tokenPayload : tokenPayload = {
                id: usuario._id,
                arrRol: usuario.credencial.arrRol,
                arrPermiso: usuario.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenPayload, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }

    }
    
    async reloggin( req : any, res : any ) {
        
        let usuario : models.IUsuario | null = await models.Usuario.findOne({ 'credencial.usuario' :  req.usuario.credencial.usuario })

        if ( usuario == null )
            res.status(404).end()
        else {
            console.log('Reloggin: ' + usuario.nombre)
            let tokenData : tokenPayload = {
                id: usuario._id,
                arrRol: usuario.credencial.arrRol,
                arrPermiso: usuario.credencial.arrPermiso
            }

            let token : string = jwt.sign( tokenData, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })

            res.status(200).json({ token })
        }
    }

    async getArrEfectiveUsuario(req:any, res:any){
        console.log(req.params)
        // Esto se puede { cachear, corganizar permisos } en inmobiliarias/contactos base class por id o personalizarlo
        let arrEffectiveUsuario : [models.IUsuario] | {} = await models.Usuario.find({
            refInmobiliaria: req.usuario.refInmobiliaria,
        }, '-credencial.contrasena')
        console.log('Effective contacts for: ' + req.usuario.nombre)
        res.json(arrEffectiveUsuario)
    }

    async getEffectiveUsuarioJWT( req : any, res : any) {
        //Esta es la comprobacion de permisos, mirare de usar casl o modulillo propio.
        // tipo entrada: function autoriza(['admin', 'agente'], ['usuarioEfectivo', 'P2'])
        //if( req.contacto.credencial.rol.indexOf('admin') == -1 ) {}
        //if( req.contacto.credencial.arrPermiso.indexOf('usuarioEfectivo') == -1 ) {}
        //Tambien que pida un usuario de esta inmobiliaria.
        
        try {
            // Aqui va una llamada al Contacto.finById Cacheado.
            let effectiveUsuario : models.IUsuario | null = await models.Usuario.findOne({ 
                _id: req.params.effectiveUsuario,
                refInmobiliaria: req.usuario.refInmobiliaria
            })
            console.log(effectiveUsuario)
            console.log(req.usuario)
            if (effectiveUsuario == null)
                res.status(404).end('Not found.')
            else {
                let tokenPayload : tokenPayload = {
                    id: effectiveUsuario._id,
                    arrRol: effectiveUsuario.credencial.arrRol,
                    arrPermiso: effectiveUsuario.credencial.arrPermiso
                }
                console.log('Effective loggin: ' + effectiveUsuario.nombre)
    
                let token : string = jwt.sign( tokenPayload, cfg.jwt.key, { expiresIn: cfg.jwt.tokenExpireTime })
    
                res.status(200).json({ token })
    
            }
        } catch ( e ) {
            res.status(404).end(e.message)
        }
        

    }



}

export let auth = new mngAuth()