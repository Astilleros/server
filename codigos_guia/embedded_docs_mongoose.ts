        // Este crea un documento en la bd y en su tabla y despues lo copia al array. ( duplica)
        // Despues se tienen q tratar como si fueran dos... ERROR
        let objContador : IContador = await Contador.objModel.create({ 
            name: 'PContadorName1'
        });
        objPulpo.contadores.push(objContador);


        
        // Este no crea _v (no crea un documento mongoose con su propia tabla), pero si añade un documetno al array.
        // No crea __v pero si que se comporta como un obj mongo con su _id.
        objPulpo.contadores.push({
            name: 'PContadorName2'
        });

        // declarandolo antes...?
        let objContador3 : IContador = new Contador.objModel({
            name: 'PContadorName3'
        });
        objPulpo.contadores.push(objContador3);

        // este no tira bien pero seria ir a lo mongodb directamente
        await Pulpo.objModel.updateOne(
            { _id: objPulpo._id },
            { $push: { 
                manometros: {
                        name: 'PManometroName2'
                    }
                } 
            }
         );

        //este tiene problemas de tipo... no create method in array<model>
        let objContador2  = objPulpo.contadores.create({ name: 'objContador2' });

//ELIMINAR Y MIDDLEWARES CASCADE DELETE ( Intento de forma atomica ... peeero)
// DE OTRA PAG RELACIONADO
// Este es por mongodb elimina el doc pero no hace los middlewares.
        await Pulpo.objModel.updateOne( {_id: objPulpo._id}, { $pull: { contadores: { _id: objContador._id}} } );
