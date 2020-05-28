import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { ICompany } from "./Company";

// Schema
const UserSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true
  },
  friends: [{
    type: String,
  }],
  creditCards: {
    type: Map,
    of: string
  }
})

enum Gender {
  Male = 1,
  Female = 0
}

// DO NOT export this
interface IUserSchema extends Document {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  // leave the company field out
  gender: Gender;
  friends: Types.Array<string>;
  creditCards?: Types.Map<string>;
}

// Virtuals
UserSchema.virtual("fullName").get(function() {
  return this.firstName + this.lastName
})

// Methods
UserSchema.methods.getGender = function() {
  return this.gender > 0 "Male" : "Female"
}

// DO NOT export
interface IUserBase extends IUserSchema {
  fullName: string;
  getGender(): string;
}

// Export this for strong typing
export interface IUser extends IUserBase {
  company: ICompany["_id"];
}

// Export this for strong typing
export interface IUser_populated extends IUserBase {
  company: ICompany;
}

// Static methods
UserSchema.statics.findMyCompany = async function(id) {
  return this.findById(id).populate("company").exec()
}

// For model
export interface IUserModel extends Model<IUser> {
  findMyCompany(id: string): Promise<IUser_populated>
}

// Document middlewares
UserSchema.pre<IUser>("save", function(next) {
  if (this.isModified("password")) {
    this.password = hashPassword(this.password)
  }
});

// Query middlewares
UserSchema.post<Query<IUser>>("findOneAndUpdate", async function(doc) {
  await updateCompanyReference(doc);
});

// Default export
export default model<IUser, IUserModel>("User", UserSchema)