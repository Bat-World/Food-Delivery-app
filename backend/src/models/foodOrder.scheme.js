import mongoose from 'mongoose';
import { foodOrderItemSchema } from './foodOrderItem.scheme';
const { Schema, model } = mongoose;

const foodOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    totalPrice: { type: Number, required: true }, 
    foodOrderItems: { type: [foodOrderItemSchema], required: true }, 
    status: { 
      type: String, 
      enum: ['pending', 'canceled', 'delivered'], 
      default: 'pending', 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const foodOrderModel = model('FoodOrder', foodOrderSchema);
