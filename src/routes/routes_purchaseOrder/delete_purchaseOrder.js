const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

router.delete("/order/:id", async (req, res) => {
  try {
    const { id } = req.params
    await PurchaseOrder.findByIdAndDelete(id, req.body);
    res.status(200).json({message:"Purchase order successfully deleted."});
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

