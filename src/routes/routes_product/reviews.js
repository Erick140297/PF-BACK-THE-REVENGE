const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

router.put("/reviews", async (req, res) => {
  try {
    const { productId, userName, comentario, rating } = req.body 
    const product = await Product.findById(productId)
    const obj = {user: userName, comentario}
    product.review.push(obj)
    product.rating.push(rating)
    const savedProduct = await product.save()
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
