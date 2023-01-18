const { Router } = require("express");
const router = Router();
const PurchaseOrder = require("../../models/purchaseOrder");

// Para esta ruta es necesario poner el id del usuario exacto que queremos verificar o revisar. "id".
// Siga correctamente el path para que no arroje errores el servidor.

router.get("/order/:id", async (req, res) => {
  try {
    const {id} = req.params
    const order = await PurchaseOrder.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

