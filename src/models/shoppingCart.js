const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
  {
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        _id:false
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
