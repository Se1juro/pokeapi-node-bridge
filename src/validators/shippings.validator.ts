import { IsEnum, IsString } from "class-validator";
export const teams: string[] = ["pending", "transit", "sent"];

export class CreateShipping {
  @IsString()
  shippingOrderId: string;

  @IsEnum(teams, {
    message: "El equipo es invalido",
  })
  status: string;
}
