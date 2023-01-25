const express = require("express");
const ShoppingCart = require("../../models/shoppingCart");
const User = require("../../models/user");

const router = express.Router();

// Para esta ruta es necesario poner el id del carrito exacto que queremos ver. "id"
// Verificar siempre la ruta a la que nos dirigimos y respetar la barrita --> "/" después de un "/shoppingCart" para que logre funcionar correctamente.

router.get("/shoppingCart/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({email});
    if (user.cart.length === 0) {
      res.status(200).json({ message: "Tu carrito esta vácio" });
    } else {
      const cart = await ShoppingCart.findById(user.cart).populate(
        "items.product"
      );
      if (cart.items.length === 0) {
        res.status(200).json({ message: "Tu carrito esta vácio" });
      } else {
        res.status(200).json(cart);
      }
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
