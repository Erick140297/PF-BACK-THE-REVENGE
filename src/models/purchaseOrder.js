const { Schema, model } = require("mongoose");

const purchaseOrderSchema = new Schema(
  {
    totalPrice:Number,
    status:String,
    date: {
      type:String,
      default: new Date().toISOString().substring(0, 10)
    }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const PurchaseOrder = model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
