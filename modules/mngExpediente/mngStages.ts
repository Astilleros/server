export abstract class absStage {
    private arrLstErrors: any[] = [];
  
    protected addError( blContinue: boolean, strUsername: string, objData: any = {} ) {
        this.arrLstErrors.push( {
            blContinue: blContinue,
            strUsername: strUsername,
            objData: objData
        } );
    }
  
    getLstErrors() {
        return this.arrLstErrors;
    }
  
    abstract getStageName() : string;
    abstract testStage( objObjetive: any ) : any;
};


export class mngStages {
    arrLstStages: any[] = [];
    objObjetive: any = {};
    
  
    setObjetive( objObjetive: any ) {
        this.objObjetive = objObjetive;
    }
  
  
    testStagesRange( intStartStage: number = 0, intStopStage: number = -1 ) {
        let strLastStageName = "";
        let arrLstAllErrors: any[] = [];
      
        if( intStopStage == -1 )
            intStopStage = this.arrLstStages.length;
      
        iterStages: for( let k = intStartStage; k < intStopStage; k++ ) {
            let strStageName = this.arrLstStages[ k ].getStageName();
            this.arrLstStages[ k ].testStage( this.objObjetive );
            let arrLstErrors = this.arrLstStages[ k ].getLstErrors()
          
            strLastStageName = strStageName;
          
            for(let j = 0; j < arrLstErrors.length; j++ ) {
                arrLstErrors[ j ].strStageName = strStageName;
            }
          
            arrLstAllErrors = arrLstAllErrors.concat( arrLstErrors );
          
            for(let j = 0; j < arrLstErrors.length; j++ ) {
                if( arrLstErrors[ j ].blContinue == false ) {
                    break iterStages;
                }
            }

        }
      
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstAllErrors,
        };
    }
  
    
    testStage( intNumStage: number = 0 ) {
        return this.arrLstStages[ intNumStage ].testStage( this.objObjetive );
    }
  
  
    addStage( objStage: absStage ) {
        this.arrLstStages.push( objStage );
    }
  
  
    //  ---------------------------------------
  
  
      filterLastStage( objResStages: any ) {
        let strLastStageName = objResStages.strLastStageName;
        let arrLstAllErrors = objResStages.arrLstErrors;
        let arrLstResultStageErrors: any[] = [];
        
        for( let k = 0; k < arrLstAllErrors.length; k++ ) {
            if(
                ( arrLstAllErrors[ k ].strStageName == strLastStageName )
            ) {
                arrLstResultStageErrors.push( arrLstAllErrors[ k ] );
            }
        }
        //console.log( objResStages );
      
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstResultStageErrors,
        };
    }
  
  
    filterByUsername( objResStages: any, strUsername: string ) {
        let strLastStageName = objResStages.strLastStageName;
        let arrLstAllErrors = objResStages.arrLstErrors;
        let arrLstResultStageErrors: any[] = [];
        
        for( let k = 0; k < arrLstAllErrors.length; k++ ) {
            if(
                  ( arrLstAllErrors[ k ].strUsername == strUsername )
            ) {
                arrLstResultStageErrors.push( arrLstAllErrors[ k ] );
            }
        }
        //console.log( objResStages );
      
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstResultStageErrors,
        };
    }
  
  
}



