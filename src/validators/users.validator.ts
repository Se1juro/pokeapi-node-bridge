import { IsString} from "class-validator";
export class CreateUserValidator {

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  team: "blue" | "red" | "yellow";
}