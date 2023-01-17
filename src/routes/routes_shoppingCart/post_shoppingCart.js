const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const Product = require("../../models/product");

router.post("/shoppingCart", async (req, res) => {
    try {
        const {productId, userId} = req.body
        let product = await Product.findById(productId)
        let user = await User.findOne(userId);

        
        res.status(201).json(user, product);
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router