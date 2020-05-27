import { Application, Router } from 'express';
import pulpoRouter from './pulpo.router';

export function Routes(app : Application){
	app.use('/', pulpoRouter);
}