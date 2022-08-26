import { IsEnum, IsString } from "class-validator";
export const teams: string[] = ["red", "blue", "yellow"];
export class CreateUserValidator {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  nickName: string;

  @IsEnum(teams, {
    message: "El equipo es invalido",
  })
  team: "blue" | "red" | "yellow";
}
