import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const foodOrderItemSchema = new Schema(
  {
    food: { type: Schema.Types.ObjectId, ref: 'Food', required: true }, // Reference to the Product model
    quantity: { type: Number, required: true }, // The number of the food item in the order
  },
  {
    _id: false
  }
);

