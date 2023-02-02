const { Router } = require("express");
const axios = require("axios");
const Product = require("../../models/product");
const PurchaseOrder = require("../../models/purchaseOrder");
const router = Router();

router.put("/logic/stock/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await PurchaseOrder.findById(orderId);

    const promises = await order.cart.items.map((e) => {
      return axios.put(
        `http://localhost:3001/stock/${e.product._id}/${e.quantity}`
      );
    });
    const result = await Promise.all(promises);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
