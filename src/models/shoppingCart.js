const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
    {
        price: {
            type: Number,
            required: true,
        },
        quantify: {
            type: Number,
            required: true,
        },
        products:[
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
        user:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
{
    timestamps: false,
    versionKey: false,
}
);

const shoppingCart = model("ShoppingCart", shoppingCartSchema);

module.exports = shoppingCart;