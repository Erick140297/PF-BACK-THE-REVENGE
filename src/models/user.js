const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        city: String,
        address: String,
        phone: String,
        admin: {
            type: Boolean,
            default: false,
        },
        payMethod: Object,
        deleteLogic: {
            type: Boolean,
            default: false,
        },
        cart:[
            {
                type: Schema.Types.ObjectId,
                ref: "ShoppingCart",
            }
        ],
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "PurchaseOrder"
            }
        ]
    },
{
    timestamps: false,
    versionKey: false,
}
);

const User = model("User", userSchema);

module.exports = User;