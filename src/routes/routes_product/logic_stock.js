const { Router } = require("express");
const axios = require("axios");
const PurchaseOrder = require("../../models/purchaseOrder");
const router = Router();

router.put("/logic/stock/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await PurchaseOrder.findById(orderId);

    const promises = await order.cart.items.map(async (e) => {
      return await axios.put(
        `https://pf-back-the-revenge-production.up.railway.app/stock/${e.product._id}/${e.quantity}`
      );
    });
   
    await Promise.all(promises);

    res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
