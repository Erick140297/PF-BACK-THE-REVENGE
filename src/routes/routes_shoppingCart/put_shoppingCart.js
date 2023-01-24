const { Router } = require("express");
const router = Router();
const ShoppingCart = require("../../models/shoppingCart");

router.put("/shoppingCart", async (req, res) => {
  try {
    // Obtener el id del carrito y el id del producto a partir del cuerpo de la solicitud
    const { cartId, productId, quantity } = req.body;
    // Buscar el carrito en la base de datos
    const cart = await ShoppingCart.findById(cartId);
    // Buscar el índice del producto en el arreglo de items
    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    // Actualizar la cantidad del producto
    cart.items[index].quantity = quantity;
    // Guardar el carrito actualizado en la base de datos
    const updatedCart = await cart.save();
    res.status(200).json( updatedCart );
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router
