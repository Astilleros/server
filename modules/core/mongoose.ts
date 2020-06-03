import mongoose from 'mongoose';

export interface IMongoose extends mongoose.Mongoose {};

export let initMongoose = async ($ : any) : Promise<mongoose.Mongoose> => {

    mongoose.connection.on('connected', () => {
        console.log('Mongoose: Connection Established')
    })
      
    mongoose.connection.on('reconnected', () => {
        console.log('Mongoose: Connection Reestablished')
    })
      
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose: Connection Disconnected')
    })
      
    mongoose.connection.on('close', () => {
        console.log('Mongoose: Connection Closed')
    })
      
    mongoose.connection.on('error', (error) => {
        console.log('Mongoose: Connection Error ' + error)
    })

    return await mongoose.connect($.cfg.mongodb.uri, $.cfg.mongodb.options);

};