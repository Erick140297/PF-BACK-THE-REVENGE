const { Schema, model } = require("mongoose");

const purchaseOrderSchema = new Schema(
  {
    date: {
      type:String,
      default: new Date().toISOString().substring(0, 10)
    },
    cart:Object,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: 'pendiente'
    },
    total:Number
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const PurchaseOrder = model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
