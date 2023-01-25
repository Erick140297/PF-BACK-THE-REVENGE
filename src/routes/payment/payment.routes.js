const { Router } = require("express");
const { createOrder, cancelOrder, captureOrder } = require("./payment.controller")

const router = Router();

router.post('/create-order', createOrder)
router.get('/capture-order', captureOrder)
router.get('/cancel-order', cancelOrder)

module.exports = router;