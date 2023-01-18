const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

// Para esta ruta no es necesario añadir algún valor extra, ya que esta ruta trae todas las ordenes hechas.


router.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
