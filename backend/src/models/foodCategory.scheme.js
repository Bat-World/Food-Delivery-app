import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

export const categoryModel = model('Category', categorySchema);
