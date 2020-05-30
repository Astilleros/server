import mongoose from 'mongoose';


export class DB { 

    public constructor(){
	}
	
	private static _dbm : mongoose.Mongoose ;

	async dbConnect(mongodb_server : string) : Promise<mongoose.Mongoose | undefined> {
		try {
			DB._dbm = await mongoose.connect(mongodb_server, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			});
			return DB._dbm;
		} catch (error) {
			return undefined;
		}
	}

	dbInstance() : mongoose.Mongoose | undefined {
		if(!DB._dbm)
			return DB._dbm;
		else 
			return undefined;
	}
}