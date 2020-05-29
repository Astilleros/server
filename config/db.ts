import mongoose from 'mongoose';

let _dbm : mongoose.Mongoose ;
let _init: boolean = false;

let dbConnect = async (mongodb_server : string) : Promise<mongoose.Mongoose | undefined> => {
	try {
		_dbm = await mongoose.connect(mongodb_server, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		_init = true;
		return _dbm;
	} catch (error) {
		return undefined;
	}
}

let dbInstance = () : mongoose.Mongoose | undefined => {
	if(_init == true)
		return _dbm;
	else 
		return undefined;
}

export {
	dbConnect,
	dbInstance
}
