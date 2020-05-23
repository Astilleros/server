import mongoose from 'mongoose';
import Lectura, { ILectura } from '../models/lectura';


async function IndexLectura(): Promise<ILectura[]> {
    return  await Lectura.find({});
};
/*
export interface IShowLecturaInput {
  objId: mongoose.Types.ObjectId
}*/
async function ShowLectura( objId : mongoose.Types.ObjectId ): Promise<ILectura[]> {
    return  await Lectura.findOne({ _id: objId });
};


async function CreateLectura(objCreate: ILectura): Promise<ILectura> {
    return await Lectura.create(objCreate);
}


async function UpdateLectura( objId: mongoose.Types.ObjectId , objUpdate : ILectura ): Promise<ILectura> {
    return  await Lectura.findOneAndUpdate({ _id: objId }, objUpdate,{ new: true });
};


async function DeleteLectura( objId : mongoose.Types.ObjectId ): Promise<ILectura> {
    return  await Lectura.findByIdAndDelete(objId);
};


export default {
  IndexLectura,
  ShowLectura,
  CreateLectura,
  UpdateLectura,
  DeleteLectura
};