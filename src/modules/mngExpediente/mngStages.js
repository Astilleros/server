"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mngStages = exports.absStage = void 0;
class absStage {
    constructor() {
        this.arrLstErrors = [];
    }
    addError(blContinue, strUsername, objData = {}) {
        this.arrLstErrors.push({
            blContinue: blContinue,
            strUsername: strUsername,
            objData: objData
        });
    }
    getLstErrors() {
        return this.arrLstErrors;
    }
}
exports.absStage = absStage;
;
class mngStages {
    constructor() {
        this.arrLstStages = [];
        this.objObjetive = {};
    }
    setObjetive(objObjetive) {
        this.objObjetive = objObjetive;
    }
    testStagesRange(intStartStage = 0, intStopStage = -1) {
        let strLastStageName = "";
        let arrLstAllErrors = [];
        if (intStopStage == -1)
            intStopStage = this.arrLstStages.length;
        iterStages: for (let k = intStartStage; k < intStopStage; k++) {
            let strStageName = this.arrLstStages[k].getStageName();
            this.arrLstStages[k].testStage(this.objObjetive);
            let arrLstErrors = this.arrLstStages[k].getLstErrors();
            strLastStageName = strStageName;
            for (let j = 0; j < arrLstErrors.length; j++) {
                arrLstErrors[j].strStageName = strStageName;
            }
            arrLstAllErrors = arrLstAllErrors.concat(arrLstErrors);
            for (let j = 0; j < arrLstErrors.length; j++) {
                if (arrLstErrors[j].blContinue == false) {
                    break iterStages;
                }
            }
        }
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstAllErrors,
        };
    }
    testStage(intNumStage = 0) {
        return this.arrLstStages[intNumStage].testStage(this.objObjetive);
    }
    addStage(objStage) {
        this.arrLstStages.push(objStage);
    }
    filterLastStage(objResStages) {
        let strLastStageName = objResStages.strLastStageName;
        let arrLstAllErrors = objResStages.arrLstErrors;
        let arrLstResultStageErrors = [];
        for (let k = 0; k < arrLstAllErrors.length; k++) {
            if ((arrLstAllErrors[k].strStageName == strLastStageName)) {
                arrLstResultStageErrors.push(arrLstAllErrors[k]);
            }
        }
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstResultStageErrors,
        };
    }
    filterByUsername(objResStages, strUsername) {
        let strLastStageName = objResStages.strLastStageName;
        let arrLstAllErrors = objResStages.arrLstErrors;
        let arrLstResultStageErrors = [];
        for (let k = 0; k < arrLstAllErrors.length; k++) {
            if ((arrLstAllErrors[k].strUsername == strUsername)) {
                arrLstResultStageErrors.push(arrLstAllErrors[k]);
            }
        }
        return {
            strLastStageName: strLastStageName,
            arrLstErrors: arrLstResultStageErrors,
        };
    }
}
exports.mngStages = mngStages;
