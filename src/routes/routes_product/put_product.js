const { Router } = require("express");
const Product = require("../../models/product");
const router = Router();

// Para esta ruta es necesario poner el id del producto exacto que queremos eliminar. "id".
// Siga correctamente el path para que no arroje errores el servidor.

router.put("/product/:id", async (req, res) => {
  try {
    const { id } = req.params 
    const product = await Product.findByIdAndUpdate(id, req.body)
    const productUpdated = await Product.findById(id)
    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
