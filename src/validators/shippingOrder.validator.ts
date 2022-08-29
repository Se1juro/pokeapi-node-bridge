import { IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateShippingOrder {
  @IsDate()
  @IsOptional()
  createdTime?: Date;

  @IsNumber()
  totalAmount: number;
}
