export abstract class absCfg {

    abstract getMatrizCfg(matriz_id : string, ) : any
    abstract setMatrizCfg( matriz_id: string, Cfg : any ) : any
    abstract putMatrizCfg(matriz_id: string,  Cfg : any ) : any
    abstract patchMatrizCfg(matriz_id: string,  Cfg : any ) : any
    abstract delMatrizCfg(matriz_id: string,  Cfg : any ) : any

    abstract getInmobiliariaCfg(inmobiliaria_id : any ) : any
    abstract setInmobiliariaCfg(  inmobiliaria_id : any, Cfg : any  ) : any
    abstract putInmobiliariaCfg( inmobiliaria_id : any, Cfg : any   ) : any
    abstract patchInmobiliariaCfg(inmobiliaria_id : any, Cfg : any  ) : any
    abstract delInmobiliariaCfg( inmobiliaria_id : any, Cfg : any  ) : any

    abstract getAgenteCfg(agente_id : any) : any
    abstract setAgenteCfg( agente_id : any, Cfg : any ) : any
    abstract putAgenteCfg( agente_id : any, Cfg  : any ) : any
    abstract patchAgenteCfg( agente_id : any, Cfg : any ) : any
    abstract delAgenteCfg( agente_id : any, Cfg : any ) : any

}
