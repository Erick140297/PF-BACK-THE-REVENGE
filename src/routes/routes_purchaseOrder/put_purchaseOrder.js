const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

// Para esta ruta es necesario poner el id del usuario exacto que queremos editar. "id".
// Siga correctamente el path para que no arroje errores el servidor.

router.put("/order/:id", async (req, res) => {
  try {
    const { id } = req.params
    console.log(id, req.body)
    await PurchaseOrder.findByIdAndUpdate(id, req.body);
    const order = await PurchaseOrder.findById(id)
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

