const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const ShoppingCart = require("../../models/shoppingCart");

// Para lograr crear nuevos productos en un carrito es necesario que envies SI O SI "productId" y "userId".
// Estos dos permiten que ser cree un carrito en el modelo user (si no existe un carrito ya creado crea uno nuevo) y añadir ..
// nuevos productos si es el caso. :)

router.post("/shoppingCart", async (req, res) => {
  try {
    const { productId, userId } = req.body;
    let user = await User.findById(userId);
    if (user.cart.length === 0) {
      // Crear un nuevo carrito si el usuario no tiene uno
      const newCart = new ShoppingCart({
        items: [{ product: productId }],
        user: user._id,
      });
      const saveCart = await newCart.save();
      user.cart = user.cart.concat(saveCart._id);
      user.save();
      res.status(200).json(saveCart);
    } else {
      // Buscar el carrito del usuario
      let cart = await ShoppingCart.findById(user.cart[0]);
      // Buscar el índice del producto en el arreglo de items
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      // Verificar si el producto ya está en el arreglo de items
      if (index !== -1) {
        // Si el producto ya está en el arreglo, solo modificar la cantidad
        cart.items[index].quantity += 1;
      } else {
        // Si el producto no está en el arreglo, agregar un nuevo item
        cart.items = cart.items.concat([{ product: productId }]);
      }
      // Guardar el carrito actualizado en la base de datos
      const saveCart = await cart.save();
      res.status(200).json(saveCart);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
