import { Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IShippings {
  status: string;
  shipping_order_id: string;
}

// 2. Create a Schema corresponding to the document interface.
const shipping = new Schema<IShippings>({
  status: { type: String, required: true },
  shipping_order_id: { type: String, required: true },
});

export default shipping;
