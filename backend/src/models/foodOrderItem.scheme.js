import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const foodOrderItemSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: 'Food', required: true }, 
    quantity: { type: Number, required: true }, 
  },
  {
    timestamps: true, 
  }
);

export const foodOrderItemModel = model('FoodOrderItem', foodOrderItemSchema);
