import mongoose from 'mongoose';

let dbConnect = async (mongodb_server : string) : Promise<mongoose.Mongoose | undefined> => {
	try {
		let conn : mongoose.Mongoose = await mongoose.connect(mongodb_server, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		return conn;
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

export default dbConnect;
