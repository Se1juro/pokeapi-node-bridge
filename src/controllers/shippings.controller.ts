import {
  JsonController,
  Get,
  QueryParam,
  Body,
  Post,
} from "routing-controllers";
import { ShippingsService } from "../services/shippings.service";
import { CreateShippingOrder } from "../validators/shippingOrder.validator";
import { CreateShipping } from "../validators/shippings.validator";

@JsonController("/api/shippings")
export class ShippingsController {
  constructor(protected readonly shippingsService: ShippingsService) {}

  @Post("/order")
  async createShippingOrder(@Body() payload: CreateShippingOrder) {
    return await this.shippingsService.createShippingOrder(payload);
  }

  /*   @Post("/")
  async createShipping(@Body() payload: CreateShipping) {
    return await this.shippingsService.createShipping(payload);
  }

  @Get("/")
  async listShippings() {
    const shippings = await this.shippingsService.listShippings();
    return shippings;
  } */
}
