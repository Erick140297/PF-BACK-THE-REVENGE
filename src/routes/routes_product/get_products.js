const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

// Para esta ruta no es necesario añadir algún valor extra, ya que esta ruta trae todas las ordenes hechas.

router.get("/products", async (req, res) => {
  try {
    const { name, subcategory, category } = req.query;
    if (
      name !== undefined &&
      subcategory === undefined &&
      category == undefined
    ) {
      const searchRegex = new RegExp(name, "i");
      const products = await Product.find({
        $or: [{ name: { $regex: searchRegex } }],
      });
      res.status(200).json(products);
      return;
    } else if (
      name === undefined &&
      subcategory !== undefined &&
      category === undefined
    ) {
      const products = await Product.find({
        subCategory: { $regex: subcategory, $options: "i" },
      });
      res.status(200).json(products);
      return;
    } else if (
      name === undefined &&
      subcategory === undefined &&
      category !== undefined
    ) {
      const products = await Product.find({
        category: { $regex: category, $options: "i" },
      });
      res.status(200).json(products);
      return;
    } else {
      const products = await Product.find();
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({message:"No se encontrarón resultados"});
  }
});

module.exports = router;
