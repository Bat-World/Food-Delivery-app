import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    orderedFoods: {
      type: [Schema.Types.ObjectId],
      ref: "FoodOrder",
      default: [],
    },
    isVerified: { type: Boolean, default: false },
    ttl: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const userModel = model("User", userSchema);
