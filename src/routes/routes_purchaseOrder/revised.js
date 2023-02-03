const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

router.put("/revised", async (req, res) => {
  try {
    const { orderId, index } = req.body;
    const order = await PurchaseOrder.findById(orderId);
    const obj = {...order.cart}
    order.cart = {}
    await order.save()
    obj.items[index].revised = true
    order.cart = obj
    const savedOrder = await order.save()
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
