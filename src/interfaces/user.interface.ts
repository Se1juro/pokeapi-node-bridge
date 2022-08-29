export interface IUser {
  id?: string;
  name: string;
  password?: string;
  nickName: string;
  team: "blue" | "red" | "yellow";
  lastConnection?: Date;
}
