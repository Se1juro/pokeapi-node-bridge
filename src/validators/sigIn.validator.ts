import { IsString } from "class-validator";

export class SigInValidator {
  @IsString()
  nickName: string;

  @IsString()
  password: string;
}
