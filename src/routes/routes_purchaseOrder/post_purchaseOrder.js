const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");
const User = require("../../models/user");
// Para lograr crear nuevos productos en un carrito es necesario que envies SI O SI "totalPrice" y "status".
// Estos dos permiten que ser cree una nueva orden en el modelo PurchaseOrder.

router.post("/order", async (req, res) => {
  try {
    const { email, cart, total } = req.body;
    const user = await User.findOne({ email });

    const newOrder = await PurchaseOrder.create({
      cart,
      user: user._id,
      total,
    });
    const savedOrder = await newOrder.save();
    user.orders = user.orders.concat(savedOrder._id);
    user.save();
    res.status(200).json(savedOrder._id);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
