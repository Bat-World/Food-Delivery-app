import mongoose from "mongoose";
import { foodOrderItemSchema } from "../../src/models/foodOrderItem.scheme.js";
const { Schema, model } = mongoose;

const foodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodOrderItems: {
      type: [foodOrderItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "canceled", "delivered"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const foodOrderModel = model("FoodOrder", foodOrderSchema);

export default foodOrderModel;
