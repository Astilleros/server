const arrModels = this.arrParams.arrModel;

// CADA COLECCION RELACIONADA TENDRA UNO DE ESTOS 4 TIPOS DE RELACIONADO EN: #CAMBIA

    // 1-Borrar documentos ajenos con referencia al propio en un campo.
    // Coll: Modelo_ajeno
    await arrModels.Modelo_ajeno.deleteMany({ ref_padre: objToDel._id });

    // 2-Borrar documentos referenciados en un array de refs propio.
    // Collection: Modelo_ajeno
    await arrModels.Modelo_ajeno.deleteMany({_id: objToDel.lstRef_Modelo_ajeno});

    // 3-Borrar referencias anidadas en un Array ajeno.
    // Collection: Modelo_ajeno
    await arrModels.Modelo_ajeno.updateMany(	
      { lstRef_Modelo_ajeno: objToDel._id },
      { $pull: { lstRef_Modelo_ajeno: objToDel._id }},
      { multi: true}
    );

    // 4-Borrar documentos ajenos con referencias anidadas en array.
    // Collection: Modelo_ajeno
    await arrModels.Modelo_ajeno.deleteMany({ lstRef_Modelo_ajeno: objToDel._id });


//Middlewares mongoose
objSchema_Modelo.pre('deleteOne',{ query: false, document: true },  async function() {
    try{
        const objToDel = this;
        // #CAMBIA
    }catch(err){
      console.log(err);
    }
});

objSchema_Modelo.pre('deleteOne', { query: true , document: false}, async function() {
    try{
        const filtro = this.getFilter();
        const objToDel = await this.model.findOne(filtro);
        // #CAMBIA
    }catch(err){
      console.log(err);
    }
});

objSchema_Modelo.pre('deleteMany', async function() {
    try{
        const filtro = this.getFilter();
        const arrObjToDel = await this.model.find(filtro);
        for(let objToDel of arrObjToDel){
        // #CAMBIA
        }

    }catch(err){
      console.log(err);
    }
});