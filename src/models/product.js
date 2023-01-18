const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image:Object,
    stock:Number,
    category:String,
    review:Array,
    rating:Array,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
