const { Router } = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const Product = require("../../models/product");
const { uploadImage } = require("../../utils/cloudinary");
const router = Router();

const upload = multer({ dest: "uploads/" });

// Para esta ruta es necesario pasarle a Mongo estos valores "name", "price", "brand", "description", "stock", "category", del producto exacto que queremos crear.
// Siga correctamente el path para que no arroje errores el servidor.

router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, brand, description, stock, category, subCategory } = req.body;

    const product = new Product({
      name,
      price,
      brand,
      description,
      stock,
      category,
      subCategory
    });

    if (req.file.fieldname) {
      const result = await uploadImage(req.file.path);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
    }

    const savedProduct = await product.save()

    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
