const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");
const User = require("../../models/user"); 
// Para esta ruta no es necesario añadir algún valor extra, ya que esta ruta trae todas las ordenes hechas.

router.get("/order", async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await User.findById(userId)
      const orders = await PurchaseOrder.find({ user: userId });
      res.status(200).json({orders, email: user.email, name: user.name});
    } else {
      const orders = await PurchaseOrder.find();
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
