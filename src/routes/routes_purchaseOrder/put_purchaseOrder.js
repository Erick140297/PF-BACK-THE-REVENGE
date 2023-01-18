const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

router.put("/order/:id", async (req, res) => {
  try {
    const { id } = req.params
    await PurchaseOrder.findByIdAndUpdate(id, req.body);
    const order= await PurchaseOrder.findById(id)
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

