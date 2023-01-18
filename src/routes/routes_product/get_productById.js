const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
