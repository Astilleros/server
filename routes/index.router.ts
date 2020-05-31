import {initPulpoRouter} from './pulpo.router';

export function initRoutes($ : any){
	$.app.use('/', initPulpoRouter($));
}