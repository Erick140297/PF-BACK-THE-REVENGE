const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

router.put("/products/disable", async (req, res) => {
  try {
    await Product.updateMany({disable: true}, { $set: { disable: false } });
    res.status(200).send(" products updated!");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
