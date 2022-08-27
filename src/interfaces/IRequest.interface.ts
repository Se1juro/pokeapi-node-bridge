import { ISession } from "./ISession.interface";

export interface IRequest extends Request {
  user: ISession;
}
