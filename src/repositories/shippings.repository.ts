import { Service } from "typedi";
import { IShippingOrders } from "../interfaces/ShippingOrder.interface";
import ShippingOrder from "../models/shippingsOrder.model";

@Service()
export class ShippingsRepository {
  async createShippingOrder(shippingOrder: IShippingOrders) {
    const newShippingOrder = new ShippingOrder(shippingOrder);
    return newShippingOrder.save((err, data) => {
      return data;
    });
  }
}
