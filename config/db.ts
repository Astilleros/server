import mongoose from 'mongoose';
import config from './config';

let dbConnect = async () => {
	try {
		let conn = await mongoose.connect(config.mongodb_server, {
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
