import mongoose from 'mongoose'
import cfg from '../../config/config'

let dbConnect = new Promise(function(resolve) { 

	mongoose.connection.on('error', function (error) {
		console.error('Error conectando a mongodb.', error)
	})
	mongoose.connection.once('open', function () {
		console.error('Éxito conectando a mongodb.')
		resolve(mongoose)
	})
	mongoose.connect(cfg.mongodb.uri, cfg.mongodb.options)

})

export { dbConnect, mongoose }