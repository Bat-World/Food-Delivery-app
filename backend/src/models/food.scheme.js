import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    ingredients: { type: String },
    category: {type: Schema.Types.ObjectId, req: "Category", required: true},
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
  }
);

const foodModel = model('Food', foodSchema);
export default foodModel;
