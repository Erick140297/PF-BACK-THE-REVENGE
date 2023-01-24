const express = require('express');
const ShoppingCart = require("../../models/shoppingCart");

const router = express.Router();

// Para esta ruta es necesario poner el id del carrito exacto que queremos ver. "id"
// Verificar siempre la ruta a la que nos dirigimos y respetar la barrita --> "/" después de un "/shoppingCart" para que logre funcionar correctamente.

router.get('/shoppingCart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await ShoppingCart.findById(id).populate("items.product");
        res.status(200).json({ cart });  
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;