import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const categoryModel = model('Category', categorySchema);
