const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const ShoppingCart = require("../../models/shoppingCart");

// Para lograr crear nuevos productos en un carrito es necesario que envies SI O SI "productId" y "userId".
// Estos dos permiten que ser cree un carrito en el modelo user (si no existe un carrito ya creado crea uno nuevo) y añadir ..
// nuevos productos si es el caso. :)

router.post("/shoppingCart", async (req, res) => {
    try {
        const {productId, userId} = req.body
        let user = await User.findById(userId);
        console.log(productId);
        console.log(userId);
        if(user.cart.length === 0) {
            const newCart = new ShoppingCart({
                items: [{product: productId}],
                user: user._id
            });

            const saveCart = await newCart.save();
            user.cart = user.cart.concat(saveCart._id);
            user.save();
            res.status(200).json(saveCart);
        } else {
            let cart = await ShoppingCart.findById(user.cart[0]);
            cart.items = cart.items.concat([{product: productId}]);
            const saveCart = await cart.save();
            res.status(200).json(saveCart);
        }
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router