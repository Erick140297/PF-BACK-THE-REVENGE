const express = require('express');
const router = express.Router();
const ShoppingCart = require("../../models/shoppingCart");
const User = require("../../models/user");

// Para que funcione esta ruta es necesario mandar "productId" y "cartId" que ambos son de tipo String para que funcione la ruta
// Si solo se envia "cartId" se va a vaciar todo el carrito.

router.delete("/shoppingCart", async (req, res) => {
    try {
        // Obtener el id del carrito y el id del producto a partir de la ruta
        const { cartId, productId } = req.body;
        // Buscar el carrito en la base de datos
        const cart = await ShoppingCart.findById(cartId);
        // Verificar si el productId es undefined
        if (productId === undefined) {
            // Asignar el arreglo items como un arreglo vacío
            cart.items = [];
        } else {
            // Eliminar el item del arreglo de items
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
        }
        // Guardar el carrito actualizado en la base de datos
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(404).json(error);
    }
});


module.exports = router;

