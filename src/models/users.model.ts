import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const usersSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  nickName: { type: String, required: true },
  team: { type: String, required: true },
  lastConnection: { type: Date, required: true },
});

const Users = model<IUser>("users", usersSchema);

export default Users;
