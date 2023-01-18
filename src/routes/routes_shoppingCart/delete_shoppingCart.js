const express = require('express');
const router = express.Router();
const ShoppingCart = require("../../models/shoppingCart");
const User = require("../../models/user");

// Para que funcione esta ruta es necesario mandar "productId" y "cartId" que ambos son de tipo String para que funcione la ruta
// Si solo se envia "cartId" se va a vaciar todo el carrito.

router.delete('/shoppingCart', async (req, res) => {
    try {
        const {productId, cartId} = req.body;
        if(productId === undefined) {
            const cart = await ShoppingCart.findById(cartId);
            cart.products = [];
            const cleanCart = await cart.save();

            res.status(200).json({ message: "cart was successfully cleaned", cleanCart });
        } else {
            const cart = await ShoppingCart.findById(cartId);
            let newProducts = cart.products.filter((e) => e != productId);
            cart.products = newProducts;
            const savedCart = await cart.save();

            res.status(200).json({ message: "Product was successfully removed", savedCart });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

module.exports = router;

