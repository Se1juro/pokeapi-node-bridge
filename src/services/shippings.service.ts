import { Service } from "typedi";
import { ShippingsRepository } from "../repositories/shippings.repository";
import { CreateShippingOrder } from "../validators/shippingOrder.validator";

@Service()
export class ShippingsService {
  constructor(private shippingOrderRepository: ShippingsRepository) {}
  async createShippingOrder(payload: CreateShippingOrder) {
    let { createdTime } = payload;
    if (!createdTime) createdTime = new Date();
    const createdTimeUnix = Math.floor(new Date(createdTime).getTime() / 1000);
    return await this.shippingOrderRepository.createShippingOrder({
      totalAmount: payload.totalAmount,
      createdTime: createdTimeUnix,
    });
  }
  /* 
  async createShipping(payload: CreateShipping) {
    const newShipping = ShippingsRepository.create({
      ...payload,
    });
    return await ShippingsRepository.save(newShipping);
  }

  async listShippings() {
    return await ShippingsOrderRepository.listShippings();
  } */
}
