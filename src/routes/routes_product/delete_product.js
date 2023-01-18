const { Router } = require("express");
const { findByIdAndDelete } = require("../../models/product");
const Product = require("../../models/product");
const { deleteImage } = require("../../utils/cloudinary");
const router = Router();

router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
    const public_id = product.image.public_id
    await deleteImage(public_id)
    res.status(200).json({message:"Product removed successfully"});
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
