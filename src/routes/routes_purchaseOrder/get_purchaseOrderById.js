const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

router.get("/order/:id", async (req, res) => {
  try {
    const {id} = req.params
    const order = await PurchaseOrder.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

