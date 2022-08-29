export interface IUserLogged {
  nickName: string;
  lastConnection: Date;
  team: "yellow" | "red" | "blue";
  token: string;
}
