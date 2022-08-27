import { Users } from "../models/users.model";

export interface ISignUpResponse {
  user: Users;
  token: string;
}
