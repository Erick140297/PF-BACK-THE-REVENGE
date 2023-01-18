const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params 
    await Product.findByIdAndUpdate(id, req.body)
    const productUpdated = await Product.findById(id)
    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
