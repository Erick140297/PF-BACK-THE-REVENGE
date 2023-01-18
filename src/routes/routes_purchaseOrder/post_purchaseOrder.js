const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

router.post("/order", async (req, res) => {
  try {
    const { totalPrice, status } = req.body;
    const newOrder = await PurchaseOrder.create({ totalPrice, status });
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
