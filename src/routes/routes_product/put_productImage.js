const { Router } = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const Product = require("../../models/product");
const { uploadImage, deleteImage } = require("../../utils/cloudinary");
const router = Router();

const upload = multer({ dest: "uploads/" });

// Para esta ruta es necesario poner el id del producto exacto que queremos editar. "id".
// Siga correctamente el path para que no arroje errores el servidor.
// la diferencia entre esta ruta y la ruta de put_product es que esta se añade la imagen con cloudinary.

router.put("/product/image/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    const public_id = product.image.public_id
    await deleteImage(public_id)

    if (req.file.fieldname) {
      const result = await uploadImage(req.file.path);
      product.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.file.path);
      await product.save();
    }

    const productUpdated = await Product.findById(id);

    res.status(200).json(productUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
