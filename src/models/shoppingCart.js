const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema(
    {
        /* price: {
            type: Number,
        },
        quantify: {
            type: Number,
        }, */
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

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;