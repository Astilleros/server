import { mngStages, absStage } from './mngStages'


class mngStageProspecto extends absStage {
  
    getStageName() {
        return "Stage1";
    }
  
    testStage( objObjetive: any ) {
        console.log("Test stage 1");
        console.log( objObjetive );
      
        // Aqui va la logica de los errores.
        if( objObjetive.arrFile && objObjetive.arrFile.id == 555 )
            this.addError( true, 'VM_Lucia', {strText: 'El id es 555'} );
      
        this.addError( true, 'VM_Lucia', {strText: 'err1'} );
        this.addError( true, 'VM_Agente', {strText: 'err2'} );
    }
  
}

export let pruebas = () => {

    let objMngStages = new mngStages();

    objMngStages.setObjetive( {
        arrFile: {
            id: 555
        }
    } );
    
    objMngStages.addStage( new mngStageProspecto() );
    
    let objAllErrors = objMngStages.testStagesRange( 0, -1 );
    console.log( objAllErrors );
    
    console.log("\n\n ------------------------ \n\n");
    
    let objLastStageErrors = objMngStages.filterLastStage( objAllErrors );
    console.log( objLastStageErrors );
    
    console.log("\n\n ------------------------ \n\n");
    
    let objUsernameErrors = objMngStages.filterByUsername( objLastStageErrors, "VM_Lucia" );
    console.log( objUsernameErrors );
    
}


