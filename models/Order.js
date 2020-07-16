import mongoose, { Schema } from "mongoose";
const { ObjectId, Number, String } = mongoose.Schema.Types;
const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User", // bcz data coming from User model
    },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        total: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
