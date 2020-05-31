import mongoose from 'mongoose';

export interface IMongoose extends mongoose.Mongoose {};

export let initMongoose = async ($ : any) : Promise<mongoose.Mongoose> => {

    let objMongoose : mongoose.Mongoose = await mongoose.connect($.cfg.mongodb.uri, $.cfg.mongodb.options);

    return objMongoose;

};