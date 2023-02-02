const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

router.put("/stock/:productId/:quantity", async (req, res) => {
  try {
    const { productId, quantity } = req.params;
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity
    const savedProduct = await product.save()
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
