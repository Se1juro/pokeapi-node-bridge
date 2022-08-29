import { Schema, model } from "mongoose";
import { IShippingOrders } from "../interfaces/ShippingOrder.interface";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const shippingOrdersSchema = new Schema<IShippingOrders>({
  totalAmount: { type: Number, required: true },
  createdTime: { type: Number, required: true },
});

const ShippingOrder = model<IShippingOrders>(
  "shipping_orders",
  shippingOrdersSchema
);

export default ShippingOrder;
