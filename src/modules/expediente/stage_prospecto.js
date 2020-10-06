"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruebas = void 0;
const mngStages_1 = require("./mngStages");
class mngStageProspecto extends mngStages_1.absStage {
    getStageName() {
        return "Stage1";
    }
    testStage(objObjetive) {
        console.log("Test stage 1");
        console.log(objObjetive);
        if (objObjetive.arrFile && objObjetive.arrFile.id == 555)
            this.addError(true, 'VM_Lucia', { strText: 'El id es 555' });
        this.addError(true, 'VM_Lucia', { strText: 'err1' });
        this.addError(true, 'VM_Agente', { strText: 'err2' });
    }
}
exports.pruebas = () => {
    let objMngStages = new mngStages_1.mngStages();
    objMngStages.setObjetive({
        arrFile: {
            id: 555
        }
    });
    objMngStages.addStage(new mngStageProspecto());
    let objAllErrors = objMngStages.testStagesRange(0, -1);
    console.log(objAllErrors);
    console.log("\n\n ------------------------ \n\n");
    let objLastStageErrors = objMngStages.filterLastStage(objAllErrors);
    console.log(objLastStageErrors);
    console.log("\n\n ------------------------ \n\n");
    let objUsernameErrors = objMngStages.filterByUsername(objLastStageErrors, "VM_Lucia");
    console.log(objUsernameErrors);
};
